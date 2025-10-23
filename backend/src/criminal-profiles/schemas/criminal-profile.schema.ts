import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CriminalProfileDocument = CriminalProfile & Document;

@Schema({ collection: 'threat-actors', timestamps: true })
export class CriminalProfile {
  @Prop({ required: true })
  actor_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ required: true })
  threat_level: string;

  @Prop({ type: Object })
  origin: {
    country?: string;
    region?: string;
    city?: string;
  };

  @Prop({ type: Object })
  active_period: {
    start?: string;
    end?: string;
    status?: string;
  };

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: Object })
  profile: {
    perpetrators?: Array<{
      name?: string;
      born?: number;
      died?: number;
      iq?: number;
      role?: string;
      psychology?: string;
      sentence?: string;
    }>;
    victim_count?: number;
    victim_demographics?: string;
    modus_operandi?: {
      vehicle?: string;
      location?: string;
      method?: string;
      tools?: string[];
      evidence?: string;
    };
    capture?: {
      date?: string;
      method?: string;
      key_evidence?: string;
    };
  };

  @Prop({ type: [String], default: [] })
  criminological_significance: string[];

  @Prop({ type: [String], default: [] })
  threat_intelligence_lessons: string[];

  @Prop()
  research_purpose: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  created_by: string;
}

export const CriminalProfileSchema = SchemaFactory.createForClass(CriminalProfile);
