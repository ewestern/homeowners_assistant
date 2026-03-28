import Anthropic from "@anthropic-ai/sdk";
import type { AgentConfig, MonitoringResult, ProgramData } from "./types";

const DEFAULT_MODEL = "claude-sonnet-4-6";

export class MonitoringAgent {
  private client: Anthropic;
  private model: string;

  constructor(config: AgentConfig = {}) {
    this.client = new Anthropic({ apiKey: config.apiKey });
    this.model = config.model ?? DEFAULT_MODEL;
  }

  async checkProgram(program: Partial<ProgramData> & { name: string }): Promise<MonitoringResult> {
    const prompt = `You are a researcher verifying the current status of homeowner incentive programs.

Check the following program and assess whether it is still active:

Program Name: ${program.name}
Provider: ${program.providerName ?? "Unknown"}
Category: ${program.category ?? "Unknown"}
URL: ${program.url ?? "Not provided"}
Description: ${program.description ?? "Not provided"}

Based on your knowledge, assess:
1. Is this program currently ACTIVE, INACTIVE, EXPIRED, or UNVERIFIED (you can't confirm)?
2. Are there any known changes to the program (amount changes, deadline extensions, eligibility changes)?
3. Any important notes for homeowners?

Respond in this JSON format:
{
  "status": "ACTIVE | INACTIVE | EXPIRED | UNVERIFIED",
  "notes": "Brief assessment of the program's current status",
  "changes": ["List of any known changes since last check, if any"]
}

Return only valid JSON.`;

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("");

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error(`No JSON found in monitoring agent response for program: ${program.name}`);
    }

    const parsed = JSON.parse(jsonMatch[0]) as {
      status: MonitoringResult["status"];
      notes?: string;
      changes?: string[];
    };

    return {
      programName: program.name,
      url: program.url,
      status: parsed.status,
      checkedAt: new Date().toISOString(),
      notes: parsed.notes,
      changes: parsed.changes,
    };
  }

  async checkPrograms(
    programs: Array<Partial<ProgramData> & { name: string }>
  ): Promise<MonitoringResult[]> {
    const results = await Promise.allSettled(programs.map((p) => this.checkProgram(p)));

    return results.map((result, i) => {
      if (result.status === "fulfilled") return result.value;
      return {
        programName: programs[i].name,
        url: programs[i].url,
        status: "UNVERIFIED" as const,
        checkedAt: new Date().toISOString(),
        notes: `Error during check: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`,
      };
    });
  }
}
