import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
	const userService = inject(UserService);
	const token = userService.token;

	if (!token) return next(req);

	if (isRefreshing) return refreshAndProceed(userService, req, next);

	return next(addToken(req, token))
		.pipe(
			catchError(err => {
				if (err.status == 403) {
					return refreshAndProceed(userService, req, next);
				}

				return throwError(err);
			})
		)
}

const refreshAndProceed = (
	userService: UserService, req: HttpRequest<any>, next: HttpHandlerFn
) => {
	if (!isRefreshing) {
		isRefreshing = true;

		return userService.refreshAuthToken()
			.pipe(
				switchMap((res) => {
					isRefreshing = false;
					return next(addToken(req, res.access_token));
				})
			)
	}

	return next(addToken(req, userService.token!));
}

const addToken = (req: HttpRequest<any>, token: string) => {
	return req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`
		}
	})
}