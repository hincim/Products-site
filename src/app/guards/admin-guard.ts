import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.authService.user.pipe(
            map(user =>{
                return !!user && user.email == "hakan@gmail.com";
            }),
            tap(isAdmin =>{
                if (!isAdmin) {
                    this.router.navigate(["/account"]);
                }
            })
        );

    }

}