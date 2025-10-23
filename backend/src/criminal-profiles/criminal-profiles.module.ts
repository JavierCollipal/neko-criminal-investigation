import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CriminalProfilesController } from './criminal-profiles.controller';
import { CriminalProfilesService } from './criminal-profiles.service';
import { CriminalProfile, CriminalProfileSchema } from './schemas/criminal-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CriminalProfile.name, schema: CriminalProfileSchema },
    ]),
  ],
  controllers: [CriminalProfilesController],
  providers: [CriminalProfilesService],
  exports: [CriminalProfilesService],
})
export class CriminalProfilesModule {}
