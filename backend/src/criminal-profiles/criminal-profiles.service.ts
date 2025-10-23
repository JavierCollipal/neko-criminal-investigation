import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriminalProfile, CriminalProfileDocument } from './schemas/criminal-profile.schema';

@Injectable()
export class CriminalProfilesService {
  constructor(
    @InjectModel(CriminalProfile.name)
    private criminalProfileModel: Model<CriminalProfileDocument>,
  ) {}

  /**
   * Get all criminal profiles
   * @param limit - Maximum number of profiles to return
   * @param skip - Number of profiles to skip (for pagination)
   */
  async findAll(limit: number = 50, skip: number = 0): Promise<CriminalProfile[]> {
    return this.criminalProfileModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .exec();
  }

  /**
   * Get criminal profile by actor_id
   * @param actorId - Unique actor identifier
   */
  async findByActorId(actorId: string): Promise<CriminalProfile | null> {
    return this.criminalProfileModel.findOne({ actor_id: actorId }).exec();
  }

  /**
   * Get criminal profile by MongoDB _id
   * @param id - MongoDB ObjectId
   */
  async findById(id: string): Promise<CriminalProfile | null> {
    return this.criminalProfileModel.findById(id).exec();
  }

  /**
   * Search criminal profiles by name or alias
   * @param query - Search query string
   */
  async search(query: string): Promise<CriminalProfile[]> {
    return this.criminalProfileModel
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { aliases: { $elemMatch: { $regex: query, $options: 'i' } } },
        ],
      })
      .limit(20)
      .exec();
  }

  /**
   * Get profiles by threat level
   * @param threatLevel - Threat level (e.g., CRITICAL, HIGH, EXTREME)
   */
  async findByThreatLevel(threatLevel: string): Promise<CriminalProfile[]> {
    return this.criminalProfileModel
      .find({ threat_level: threatLevel.toUpperCase() })
      .sort({ created_at: -1 })
      .exec();
  }

  /**
   * Get profiles by category
   * @param category - Category (e.g., Serial Killers, Ransomware)
   */
  async findByCategory(category: string): Promise<CriminalProfile[]> {
    return this.criminalProfileModel
      .find({ categories: { $in: [category] } })
      .sort({ created_at: -1 })
      .exec();
  }

  /**
   * Get aggregated statistics
   */
  async getStatistics(): Promise<{
    total: number;
    by_threat_level: Record<string, number>;
    by_category: Record<string, number>;
  }> {
    const total = await this.criminalProfileModel.countDocuments();

    const threatLevels = await this.criminalProfileModel.aggregate([
      { $group: { _id: '$threat_level', count: { $sum: 1 } } },
    ]);

    const categories = await this.criminalProfileModel.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
    ]);

    return {
      total,
      by_threat_level: threatLevels.reduce(
        (acc, item) => {
          acc[item._id] = item.count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      by_category: categories.reduce(
        (acc, item) => {
          acc[item._id] = item.count;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }
}
