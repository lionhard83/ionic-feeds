import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feed, FeedsService } from '../services/feeds.service';

interface RefresherEventDetail {
  complete(): void;
}

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}

interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public feeds: Feed[];
  public defaultOptions = { skip: 0, limit: 3 };
  public currentSkip = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedsService
  ) {}

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.feeds = await this.feedService.getFeeds(this.defaultOptions);
  }

  async doRefresh(event: RefresherCustomEvent) {
    this.feeds = [];
    this.currentSkip = 0;
    this.feeds = await this.feedService.getFeeds(this.defaultOptions);
    event.target.complete();
  }

  async loadData(event: InfiniteScrollCustomEvent) {
    this.currentSkip = this.currentSkip + this.defaultOptions.limit;
    this.feeds = [
      ...this.feeds,
      ...(await this.feedService.getFeeds({
        limit: this.defaultOptions.limit,
        skip: this.currentSkip,
      })),
    ];
    event.target.complete();
  }
}
