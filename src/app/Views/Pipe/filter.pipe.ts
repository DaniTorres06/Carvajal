import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  

  transform (value: any, arg: any) : any {
    const resultPosts = [] ;

    for (const post of value){
      if (post.title.indexOf(arg) > -1 ) {
        resultPosts.push(post) ;
     };
   };

   return resultPosts ;
  }
  */
  transform (value: any, arg: any): any{
    if ( arg === '' || arg.length < 3 ) return value ;

    const resultPosts = [];
    for(const post of value ) {
      if(post.title.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        };
      resultPosts.push ( post ) ;
      };
     return resultPosts
    }


}
