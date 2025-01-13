import { Controller, Get, Query } from '@nestjs/common';
import { searchGoogle } from './google-search.service';

@Controller('google')
export class GoogleSearchController {
  @Get('search')
  async performSearch(@Query('q') query: string) {
    if (!query) {
      return { error: 'Lipsă interogare pentru căutare.' };
    }
    return await searchGoogle(query);
  }
}
