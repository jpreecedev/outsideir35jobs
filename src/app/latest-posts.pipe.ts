import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'latestPosts',
})
export class LatestPostsPipe implements PipeTransform {
  transform(value: Job[], category: string): Job[] {
    return value.filter((x) => x.category === category);
  }
}
