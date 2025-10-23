import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CriminalProfilesModule } from './criminal-profiles/criminal-profiles.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRoot(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DATABASE,
    }),

    // Feature Modules
    CriminalProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
