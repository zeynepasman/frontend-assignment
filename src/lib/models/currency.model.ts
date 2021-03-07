export class Asset {
    id: string;
    rank: string;
    symbol:string;
    name:string;
    supply:string;
    maxSupply:string;
    marketCapUsd:string;
    volumeUsd24Hr:string;
    priceUsd: string;
    changePercent24Hr: string;
    explorer: string;
    constructor(asset?) {
        asset = asset || {};
        this.rank = asset.rank || '',
        this.symbol = asset.symbol || '',     
        this.id=asset.id || '',
        this.name=asset.name || '',
        this.supply=asset.supply || '',
        this.maxSupply=asset.maxSupply || '',
        this.marketCapUsd=asset.marketCapUsd || '',
        this.volumeUsd24Hr=asset.volumeUsd24Hr || '',
        this.priceUsd = asset.priceUsd || '',
        this.changePercent24Hr = asset.changePercent24Hr || '',
        this.explorer = asset.explorer || ''
    }
}