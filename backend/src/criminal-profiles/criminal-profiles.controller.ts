import { Controller, Get, Param, Query } from '@nestjs/common';
import { CriminalProfilesService } from './criminal-profiles.service';

@Controller('api/criminal-profiles')
export class CriminalProfilesController {
  constructor(private readonly criminalProfilesService: CriminalProfilesService) {}

  @Get()
  async getAllProfiles(
    @Query('limit') limit?: string,
    @Query('skip') skip?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 50;
    const skipNum = skip ? parseInt(skip, 10) : 0;

    const profiles = await this.criminalProfilesService.findAll(limitNum, skipNum);
    return {
      success: true,
      count: profiles.length,
      data: profiles,
    };
  }

  @Get('search')
  async searchProfiles(@Query('q') query: string) {
    if (!query) {
      return {
        success: false,
        error: 'Search query is required',
      };
    }

    const results = await this.criminalProfilesService.search(query);
    return {
      success: true,
      count: results.length,
      data: results,
    };
  }

  @Get('statistics')
  async getStatistics() {
    const stats = await this.criminalProfilesService.getStatistics();
    return {
      success: true,
      data: stats,
    };
  }

  @Get('threat-level/:level')
  async getByThreatLevel(@Param('level') level: string) {
    const profiles = await this.criminalProfilesService.findByThreatLevel(level);
    return {
      success: true,
      count: profiles.length,
      data: profiles,
    };
  }

  @Get('category/:category')
  async getByCategory(@Param('category') category: string) {
    const profiles = await this.criminalProfilesService.findByCategory(category);
    return {
      success: true,
      count: profiles.length,
      data: profiles,
    };
  }

  @Get('actor/:actorId')
  async getByActorId(@Param('actorId') actorId: string) {
    const profile = await this.criminalProfilesService.findByActorId(actorId);

    if (!profile) {
      return {
        success: false,
        error: 'Profile not found',
      };
    }

    return {
      success: true,
      data: profile,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const profile = await this.criminalProfilesService.findById(id);

    if (!profile) {
      return {
        success: false,
        error: 'Profile not found',
      };
    }

    return {
      success: true,
      data: profile,
    };
  }
}
