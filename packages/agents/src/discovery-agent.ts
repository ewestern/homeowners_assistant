import Anthropic from "@anthropic-ai/sdk";
import type { AgentConfig, Category, DiscoveryResult, ProgramData } from "./types";

const DEFAULT_MODEL = "claude-sonnet-4-6";

export class DiscoveryAgent {
  private client: Anthropic;
  private model: string;

  constructor(config: AgentConfig = {}) {
    this.client = new Anthropic({ apiKey: config.apiKey });
    this.model = config.model ?? DEFAULT_MODEL;
  }

  async discoverPrograms(state: string, categories: Category[]): Promise<DiscoveryResult> {
    const categoryList = categories.join(", ");

    const prompt = `You are an expert researcher on homeowner incentive programs in the United States.

Discover all currently active incentive programs available to homeowners in ${state} for these categories: ${categoryList}.

Include programs at all levels:
- Federal programs (available nationwide)
- State-level programs specific to ${state}
- Well-known local/utility programs if applicable

For each program, provide structured data in this JSON format:
{
  "programs": [
    {
      "name": "Program Name",
      "description": "Clear description of what the program offers",
      "category": "ENERGY_EFFICIENCY | DISASTER_RESILIENCE | WATER_CONSERVATION | SAFETY_AND_HEALTH | CLEAN_TRANSPORTATION | LAND_AND_ECOSYSTEM",
      "subcategory": "optional subcategory",
      "provider": "FEDERAL | STATE | LOCAL | UTILITY | INSURER",
      "delivery": "FEDERAL_TAX_CREDITS | STATE_TAX_DEDUCTIONS | UTILITY_REBATES | MUNICIPAL_GRANTS | INSURANCE_PREMIUM_DISCOUNTS | PACE_FINANCING | LOW_INTEREST_LOANS | PROPERTY_TAX_EXEMPTIONS | CASH_REBATE_PROGRAMS | FREE_SUBSIDIZED_INSTALLATION",
      "providerName": "Name of the administering agency/utility",
      "url": "official program URL if known",
      "maxAmount": 5000,
      "amountDescription": "e.g. 30% tax credit up to $2,000",
      "incomeRestricted": false,
      "deadline": "ISO date string or null if ongoing",
      "regions": [
        { "state": "US" }
      ],
      "actionSteps": [
        {
          "stepNumber": 1,
          "title": "Step title",
          "description": "Detailed description of what to do",
          "estimatedTime": "e.g. 1-2 hours",
          "documents": ["Required document 1", "Required document 2"]
        }
      ]
    }
  ],
  "notes": "Any important caveats or notes about this research"
}

Return only valid JSON. Be thorough but accurate — only include programs you are confident are real and currently active as of your knowledge cutoff.`;

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("");

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in discovery agent response");
    }

    const parsed = JSON.parse(jsonMatch[0]) as {
      programs: ProgramData[];
      notes?: string;
    };

    return {
      programs: parsed.programs,
      state,
      categories,
      discoveredAt: new Date().toISOString(),
      notes: parsed.notes,
    };
  }
}
