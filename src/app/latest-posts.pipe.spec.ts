import { LatestPostsPipe } from './latest-posts.pipe';

describe('LatestPostsPipe', () => {
  it('create an instance', () => {
    const pipe = new LatestPostsPipe();
    expect(pipe).toBeTruthy();
  });
});
