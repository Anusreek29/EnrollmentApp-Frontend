import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  services = [
    {icon: 'fa-graduation-cap', count: '25k+', title1: 'Participants', title2: 'Trained'},
    {icon: 'fa-users', count: '10k+', title1: 'Faculty', title2: 'Trained'},
    {icon: 'fa-suitcase', count: '2k+', title1: 'Placements', title2: 'Realized'},
    {icon: 'fa-laptop', count: '2k+', title1: 'Internships', title2: 'Completed'},
    {icon: 'fa-industry', count: '112', title1: 'Industry', title2: 'Partnerships'},
    {icon: 'fa-institution', count: '1558', title1: 'Academic', title2: 'Memberships'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
