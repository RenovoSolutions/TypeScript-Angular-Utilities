
declare var uuid: uuid.IUUID;

declare module "uuid" {
	export = uuid;
}

declare module uuid {
	interface IUUID {
		v1(options?: any, buffer?: number[] | ArrayBuffer , offset?: number): string;
		v4(options?: any, buffer?: number[] | ArrayBuffer , offset?: number): string;
	}
}
