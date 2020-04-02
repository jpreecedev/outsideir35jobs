import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'latestPosts'
})
export class LatestPostsPipe implements PipeTransform {
  transform(value: PostAJobForm[], category: string): PostAJobForm[] {
    return value.filter(x => x.category === category);
  }
}
