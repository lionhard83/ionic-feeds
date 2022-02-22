import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type Countable = {
  limit: number;
  skip: number;
};

export interface Creator {
  nickname: string;
  phone: string;
  id: string;
}

export interface Comment {
  id: string;
  creator: Creator;
  message: string;
  date: string;
}

export interface Like {
  nickname: string;
  phone: string;
  id: string;
}

export interface Feed {
  id: string;
  creator: Creator;
  imageUrl: string;
  message: string;
  date: string;
  comments: Comment[];
  likes: Like[];
}

@Injectable({
  providedIn: 'root',
})
export class FeedsService {
  constructor(private httpClient: HttpClient) {}

  getFeeds(countable?: Countable) {
    const { limit = 10, skip = 0 } = countable;
    return this.httpClient
      .get<Feed[]>(`${environment.host}/feeds?limit=${limit}&skip=${skip}`)
      .toPromise();
  }
}
