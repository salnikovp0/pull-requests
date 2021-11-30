import {Response} from "express";

export interface IHttp {
    [key: string]: any
}

export interface IRes extends Response {
    [key: string]: any
}

export interface IReq extends Response {
    [key: string]: any
}
