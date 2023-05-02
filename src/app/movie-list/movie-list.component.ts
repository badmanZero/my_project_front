import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
//import 'rxjs/Rx';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  errorMessage: string = "";
  isLoading: boolean = true;
  
  constructor(private movieService: MovieService) {}

  ngOnInit() {
      this.getMovies();
  }

  getMovies() {
      this.movieService
          .getMovies()
          .subscribe(
              movies => {
                this.movies = movies;
                this.isLoading = false;
              },
              error => this.errorMessage = <any>error
          );
  }

}
