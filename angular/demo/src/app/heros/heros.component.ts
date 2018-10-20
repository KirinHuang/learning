import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heros: Hero[]

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeros()
  }

  getHeros (): void {
    this.heroService.getHeros().subscribe(heres => this.heros = heres)
  }

  add (name): void {
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heros.push(hero))
  }

}
