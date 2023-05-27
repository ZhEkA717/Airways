import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  EMPTY,
  map,
  delay,
} from 'rxjs';
import { Airport } from '../../shared/model/airport.model';
import { Trip } from '../../shared/model/trip.model';
import {
  URL_AIRPORTS,
  URL_CARTS,
  URL_LOGIN,
  URL_REGISTER,
  URL_TRIPS,
  URL_USERS,
} from '../../shared/env.constants';
import { User } from '../../shared/model/persons.model';
import { UserResponse } from '../../shared/model/response.model';
import { Cart, CartItem } from '../../shared/model/cart.model';

@Injectable({
  providedIn: 'root',
})
export default class HttpApiService {
  private trips = new BehaviorSubject<Trip[]>([]);

  public trips$: Observable<Trip[]>;

  constructor(private http: HttpClient) {
    this.trips$ = this.trips.asObservable();
  }

  getAvailableTrips(from: string, to: string): Observable<Trip[]> {
    if (!from || from === to) return EMPTY;
    const params = new HttpParams().appendAll({
      'from.code': from,
      'to.code': to,
    });
    return this.http.get<Trip[]>(URL_TRIPS, { params });
  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(URL_AIRPORTS);
  }

  getAirportByCode(code: string): Observable<Airport> {
    const params = new HttpParams().appendAll({ code });
    return this.http
      .get<Airport[]>(URL_AIRPORTS, { params })
      .pipe(map((items) => items[0]));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL_USERS);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${URL_USERS}/${id}`);
  }

  loginUser(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(URL_LOGIN, { email, password });
  }

  registerUser(user: User): Observable<UserResponse> {
    delete user.id;
    return this.http.post<UserResponse>(URL_REGISTER, user);
  }

  setBookedSeats(tripId: number, seats: string[]) {
    return this.http.patch<Trip>(`${URL_TRIPS}/${tripId}`, {
      seats: 144 - seats.length,
      bookedSeats: seats,
    });
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http.patch<Cart>(`${URL_CARTS}/${cart.userId}`, {
      items: cart.items,
    }).pipe(delay(700));
  }

  createCart(userId: number): Observable<Cart> {
    return this.http.post<Cart>(URL_CARTS, { id: userId, userId, items: [] });
  }

  getCart(userId: number): Observable<CartItem[]> {
    return this.http
      .get<Cart>(`${URL_CARTS}/${userId}`)
      .pipe(
        map((cart) => cart.items),
      );
  }

  getBookedSeats(tripId: string): Observable<string[]> {
    return this.http.get<Trip>(`${URL_TRIPS}/${tripId}`)
      .pipe(
        map((item) => item.bookedSeats),
      );
  }
}
