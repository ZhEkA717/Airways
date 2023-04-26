import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject, Observable, EMPTY, map,
} from 'rxjs';
import { Airport } from '../../shared/model/airport.model';
import { Trip } from '../../shared/model/trip.model';
import {
  URL_AIRPORTS, URL_API, URL_LOGIN, URL_REGISTER, URL_TRIPS, URL_USERS,
} from '../../shared/env.constants';
import { User } from '../../shared/model/persons.model';
import { UserResponse } from '../../shared/model/response.model';

@Injectable({
  providedIn: 'root',
})
export default class HttpService {
  private trips = new BehaviorSubject<Trip[]>([]);

  public trips$: Observable<Trip[]>;

  constructor(private http: HttpClient) {
    this.trips$ = this.trips.asObservable();
  }

  getAvailableTrips(from: string, to: string): Observable<Trip[]> {
    if (!from || from === to) return EMPTY;
    const params = new HttpParams().appendAll({ from, to });
    return this.http.get<Trip[]>(URL_API + URL_TRIPS, { params });
  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(URL_API + URL_AIRPORTS);
  }

  getAirportByCode(code: string): Observable<Airport> {
    const params = new HttpParams().appendAll({ code });
    return this.http.get<Airport[]>(URL_API + URL_AIRPORTS, { params })
      .pipe(map((items) => items[0]));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL_API + URL_USERS);
  }

  loginUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(URL_API + URL_LOGIN, user);
  }

  registerUser(user: User): Observable<UserResponse> {
    delete user.id;
    return this.http.post<UserResponse>(URL_API + URL_REGISTER, user);
  }
}
