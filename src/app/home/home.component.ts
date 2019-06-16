import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import { WalletService } from '../wallet.service';
import { Tier } from '../dataTier';
import { Member } from '../dataMember';
import { DaoService } from '../dao.service';

import { ETHCAN } from '../dataChain';

import { Token }    from '../token';
import { DATATOKEN } from '../dataToken';
import { DATASTAKES } from '../dataStakes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  public tokens = DATATOKEN;
  public selectedToken: Token;
  public stakes = DATASTAKES;
  public selectedStake: Token;

  tokenArray = [
    {bal: 230, name: 'Atom', asset: "ATOM"},
    {bal: 0.1, name: 'Bitcoin', asset: "BTC"},
    {bal: 23, name: 'Ether', asset: "ETH"},
    "TOKEN"
  ];

  // tokenArray = [230, 0.1, 23];

  stakeArray = [
    {name: 'Atom', asset: "ATOM"},
    {bal: 1, atom: 1600, name: 'Bitcoin', asset: "BTC"},
    {bal: 10, atom: 460, name: 'Ether', asset: "ETH"},
    "STAKE"
  ];

  poolArray = [
    {name: 'Atom', asset: "ATOM"},
    {bal: 2, atom: 3200, name: 'Bitcoin', asset: "BTC", volume: 56239, price: 8034, xprice: 8412},
    {bal: 40, atom: 2000, name: 'Ether', asset: "ETH", volume: 34456, price: 251, xprice: 263},
  ];

  assetPrice = {atom: 5, eth: 250, btc: 8000};
  dollarArray = [5, 8000, 250];  //USD price
  priceArray = [1, 1600, 50];   //ATOM price

  public boolSwap = true;
  public boolSend = false;

  public walletBool = false;
  submitted = false;
  wallet=true;
  swap=false;
  stakeBool=false;
  staked = false;

  public output;
  public outputInt;
  public outputAsset = "BTC";
  public outputName = "Bitcoin";
  public outputPrice;
  public outputSlip;

  // public priceBtc = this.btcAtom / this.poolArray[];
  // public priceEth = this.ethAtom / this.poolEth;

  public asset="ATOM";
  public name="Atom";
  public amtSwap = 0;
  public amtStake = 0;

  public stake = "BTC";

  public assetArray = this.tokenArray;

  public poolAsset="BTC";
  public baseAsset=0;
  public pairAsset=1;


  testAsset="";


  // dataDAO: Tier[];
  // memberDAO: Member;
  // perks0 = []; perks1 = []; perks2 = [];  perks3 = [];
  //
  // // Flags
  // loading = true;
  //
  // closeResult: string;
  //
  // //No Wallet Alert
  // private _success = new Subject<string>();
  // staticAlertClosed = false;
  // successMessage: string;
  //
  // public privatekey: string;
  // public mnemonic: string;
  // public address: string;
  //
  // ethCAN = ETHCAN;
  // public canPrice: number;
  // public canAmount: number;
  // public daoFund;

  constructor(private router: Router,
    private activatedRoute:  ActivatedRoute,
    private modalService: NgbModal,
    private walletService: WalletService,
    private daoService: DaoService) {}


    ngOnInit() {

      this.amtSwap = this.tokenArray[0];
      this.walletBool = this.walletService.walletBool;

  //     setTimeout( () => {
  //       this.loading = false;
  //       this.checkWallet();
  //     }, 2000
  //   );
  //   $('#top-nav .nav-item a').css('color','#919d9d');
  //
  //
  //   setTimeout( () => {
  //     this.checkWallet();
  //   }, 5000
  // );




//   // Alert Timer
//   setTimeout(() => this.staticAlertClosed = true, 10000);
//   this._success.subscribe((message) => this.successMessage = message);
//   this._success.pipe(
//     debounceTime(5000)
//   ).subscribe(() => this.successMessage = null);
//
//
}

ngAfterViewInit(){
}

getWalletBool(){
  return this.walletService.walletBool;
}

walletSelect() {
  if (this.wallet) {
    this.wallet = false;
    // this.assetArray = this.stakeArray;
    // this.testAsset=this.stakeArray[0].bal;
  } else {
    this.wallet = true;
    // this.assetArray = this.tokenArray;
    // this.testAsset=this.assetArray[0].bal;
  }
}

forgetAddress(): void{
  this.walletBool=false;
  this.walletService.forgetAddress();
}

swapSelect() {
  if (this.swap) {
    this.swap = false;
  } else {
    this.swap = true;
  }
  this.stakeBool = false;
}

stakeBtc() {
  this.stakeBool = true;
  this.poolAsset = "BTC";
  this.stake="BTC";
  this.baseAsset = 0;
  this.pairAsset = 1;
}

stakeEth() {
  this.stakeBool = true;
  this.poolAsset = "ETH";
  this.stake="ETH";
  this.baseAsset = 0;
  this.pairAsset = 2;
}

selectAtm(){
  this.swap=true;
  this.asset="ATOM";
  this.name="Atom";
  this.amtSwap=this.tokenArray[0].bal;
  this.baseAsset=0;
  this.pairAsset=1;
  this.setBtc()
}
selectBtc(){
  this.swap=true;
  this.asset="BTC";
  this.name = "Bitcoin";
  this.amtSwap=this.tokenArray[1].bal;
  this.baseAsset=1;
  this.pairAsset=0;
  this.setAtm();
}
selectEth(){
  this.swap=true;
  this.asset="ETH";
  this.name="Ether";
  this.amtSwap=this.tokenArray[2].bal;
  this.baseAsset=2;
  this.pairAsset=0;
  this.setBtc();
}

// selectStakeBtc(){
//   this.stake="BTC";
// }
// selectStakeEth(){
//   this.stake="ETH";
// }

swapBoolSend(){
  if (this.boolSend) {
    this.boolSwap = true;
    this.boolSend = false;
  }
  else {
    this.boolSwap = false;
    this.boolSend = true;
  }
}

setAmtSwap(){
  this.amtSwap = this.tokenArray[this.baseAsset].bal;
  this.amtStake = this.tokenArray[this.pairAsset].bal;
}

setAtm(){
  this.outputAsset="ATOM";
  this.outputName="Atom";
  this.pairAsset=0;
}

setBtc(){
  this.outputAsset="BTC";
  this.outputName="Bitcoin";
  this.pairAsset=1;
}

setEth(){
  this.outputAsset="ETH";
  this.outputName="Ether";
  this.pairAsset=2;
}

set25(id){
  this.amtSwap = 0.25  * this.tokenArray[this.baseAsset].bal;
  this.amtStake = 0.25  * this.tokenArray[this.pairAsset].bal;
}
set50(id){
  this.amtSwap = 0.50  * this.tokenArray[this.baseAsset].bal;
  this.amtStake = 0.25  * this.tokenArray[this.pairAsset].bal;

}
set75(id){
  this.amtSwap = 0.75  * this.tokenArray[this.baseAsset].bal;
  this.amtStake = 0.25  * this.tokenArray[this.pairAsset].bal;

}
set100(id){
  this.amtSwap = 1.0  * this.tokenArray[this.baseAsset].bal;
  this.amtStake = 0.25  * this.tokenArray[this.pairAsset].bal;

}

getOutput(){
  if (this.baseAsset==0){
    this.output = (this.amtSwap * this.poolArray[this.pairAsset].bal) / (this.amtSwap + this.poolArray[this.pairAsset].atom);
    this.outputPrice = this.output * this.priceArray[this.pairAsset] * this.dollarArray[0];
    this.outputSlip = this.amtSwap / (this.amtSwap + this.poolArray[this.pairAsset].atom);
    // console.log("base", this.baseAsset);
    // console.log("pair", this.pairAsset);
    // console.log("x", this.amtSwap);
    // console.log("Y", this.poolArray[this.pairAsset].bal);
    // console.log("X", this.poolArray[this.pairAsset].atom);
    // console.log("price", this.priceArray[this.pairAsset]);
    // console.log("dollar", this.dollarArray[0]);
    // console.log("y", this.output);
    // console.log("slip", this.outputSlip);
  } else if (!this.baseAsset==0 && this.pairAsset == 0){
    this.output = (this.amtSwap * this.poolArray[this.baseAsset].atom) / (this.amtSwap + this.poolArray[this.baseAsset].bal);
    this.outputPrice = this.output * this.priceArray[this.pairAsset] * this.dollarArray[0];
    this.outputSlip = this.amtSwap / (this.amtSwap + this.poolArray[this.baseAsset].bal);
    // console.log("base", this.baseAsset);
    // console.log("pair", this.pairAsset);
    // console.log("x", this.amtSwap);
    // console.log("X", this.poolArray[this.baseAsset].bal);
    // console.log("Y", this.poolArray[this.baseAsset].atom);
    // console.log("price", this.priceArray[this.pairAsset]);
    // console.log("dollar", this.dollarArray[0]);
    // console.log("y", this.output);
    // console.log("slip", this.outputSlip);
  } else if (!this.baseAsset==0 && !this.pairAsset == 0){
    this.outputInt = (this.amtSwap * this.poolArray[this.baseAsset].atom) / (this.amtSwap + this.poolArray[this.baseAsset].bal);
    this.output = (this.outputInt * this.poolArray[this.pairAsset].bal) / (this.outputInt + this.poolArray[this.pairAsset].atom);
    this.outputPrice = this.output * this.priceArray[this.pairAsset] * this.dollarArray[0];
    const slip = this.amtSwap / (this.amtSwap + this.poolArray[this.baseAsset].bal);
    this.outputSlip = (this.outputInt / (this.outputInt + this.poolArray[this.pairAsset].atom)) + slip;

    console.log("base", this.baseAsset);
    console.log("pair", this.pairAsset);
    console.log("x", this.amtSwap);
    console.log("X", this.poolArray[this.baseAsset].bal);
    console.log("Y", this.poolArray[this.baseAsset].atom);
    console.log("A", this.poolArray[this.pairAsset].atom);
    console.log("z", this.output);
    console.log("Z", this.poolArray[this.pairAsset].bal);
    console.log("price", this.priceArray[this.pairAsset]);
    console.log("dollar", this.dollarArray[0]);
    console.log("y", this.outputInt);
    console.log("slip", this.outputSlip);
  }


  return this.output;
}

updateWallet(){
  // this.tokenArray[this.baseAsset].bal -= this.amtSwap;
  // this.tokenArray[this.pairAsset].bal += this.output;
  if (this.baseAsset==0){
  this.tokenArray[this.baseAsset].bal -= this.amtSwap;
  this.tokenArray[this.pairAsset].bal += this.output;
  this.poolArray[this.pairAsset].atom += this.amtSwap;
  this.poolArray[this.pairAsset].bal -= this.output;
} else if (!this.baseAsset==0 && this.pairAsset == 0) {
  this.tokenArray[this.baseAsset].bal -= this.amtSwap;
  this.tokenArray[this.pairAsset].bal += this.output;
  this.poolArray[this.baseAsset].bal += this.amtSwap;
  this.poolArray[this.baseAsset].atom -= this.output;
} else if (!this.baseAsset==0 && !this.pairAsset == 0){
  this.tokenArray[this.baseAsset].bal -= this.amtSwap;
  this.tokenArray[this.pairAsset].bal += this.output;
  this.poolArray[this.pairAsset].bal += this.amtSwap;
  this.poolArray[this.pairAsset].atom -= this.outputInt;
  this.poolArray[this.pairAsset].atom += this.outputInt;
  this.poolArray[this.pairAsset].bal -= this.output;
}
}

swapAsset() {
  if (this.submitted) {
    this.submitted = false;
  } else {
    this.submitted = true;
    this.updateWallet();
  }
}

clickBuyBTC(){
  this.wallet=true;
  this.swap=true;
  this.selectAtm();
  this.setBtc();
}
clickBuyETH(){
  this.wallet=true;
  this.swap=true;
  this.selectAtm();
  this.setEth();
}
clickSellBTC(){
  this.wallet=true;
  this.swap=true;
  this.selectBtc();
  this.setAtm();
}
clickSellETH(){
  this.wallet=true;
  this.swap=true;
  this.selectEth();
  this.setAtm();
}


stakeAsset() {
  this.stakeBool=true;
  if (this.staked) {
    this.staked = false;
  } else {
    this.staked = true;
    this.tokenArray[this.baseAsset].bal -= this.amtSwap;
    this.tokenArray[this.pairAsset].bal -= this.amtStake;
    // this.updateWallet();
  }

  console.log(this.staked)
}


// open(content) {
//   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//     this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }
//
// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return  `with: ${reason}`;
//   }
// }

public navigate(url){
  this.router.navigate([url])
}


// public checkWallet() {
//   // if (this.walletService.walletNone) {
//   //   this._success.next(`Please Connect Your Wallet`);
//   // }
//
//   this.balAtom = 23;
//   this.b
//
// }

// getDaoFund(){
//   const result = (this.getJSON(this.ethCAN.cmcApi));
//   this.canPrice = result[0].price_usd;
//   this.canAmount =  this.getTokenBalanceAtAddress(this.ethCAN.daoAddress, this.ethCAN.canAddress, 6);
//   this.daoFund = this.canPrice * this.canAmount;
//   console.log(this.daoFund);
// }

// getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
//   const etherscanApiToken = this.ethCAN.etherscanApi + tokenAddress; // change this value if you want to use other token.
//   const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
//   const tokensAPIKey = tokensAtAddress + '&apikey=' + this.ethCAN.ApiKey;
//   const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
//   console.log(result);
//   return result;
// }

// convertToLocaleString(variable) {
//   const withCommas = parseFloat(variable).toFixed(2);
//   return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
// }

/** JSON Parser */
getJSON(url) {
  let resp;
  let xmlHttp;
  resp = '';
  xmlHttp = new XMLHttpRequest();
  if (xmlHttp != null) {
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    resp = xmlHttp.responseText;
  }
  return JSON.parse(resp);
}


}
