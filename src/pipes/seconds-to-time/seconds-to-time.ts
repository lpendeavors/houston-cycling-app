import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'SecondsToTime'
})
export class SecondsToTime implements PipeTransform {
    transform(value: number) {
        return new Date(1970, 0, 1).setSeconds(value);
    }
}