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

  public balAtom = 230;
  public balBtc = 0.1;
  public balEth = 23;

  public priceAtom = 5;

  public poolBtc = 0.5;
  public btcAtom = 800;
  public poolEth = 230;
  public ethAtom = 11000;


  public priceBtc = this.btcAtom / this.poolBtc;
  public priceEth = this.ethAtom / this.poolEth;

  public asset="ATOM";
  public name="Atom";
  public amtSwap = this.balAtom;

  public boolSwap = true;
  public boolSend = false;

  public walletBool;
  submitted = false;
  wallet=true;
  swap=true;
  stakeBool=false;

  public output;
  public outputAsset = "BTC";
  public outputName = "Bitcoin";
  public outputPrice;

  public tokens = DATATOKEN;
  public selectedToken: Token;
  public stakes = DATASTAKES;
  public selectedStake: Token;

  assetPrice = {atom: 5, eth: 250, btc: 8000}

  tokenArray = [
    {bal: 230, name: 'Atom', asset: "ATOM"},
    {bal: 0.1, name: 'Bitcoin', asset: "BTC"},
    {bal: 23, name: 'Ether', asset: "ETH"},
    "TOKEN"
  ];

  stakeArray = [
    {name: 'Atom', asset: "ATOM"},
    {bal: 0.05, atom: 500, name: 'Bitcoin', asset: "BTC"},
    {bal: 12, atom: 800, name: 'Ether', asset: "ETH"},
    "STAKE"
  ];

  public stake = "BTC";


  public assetArray = this.tokenArray;

  poolArray = [
    {name: 'Atom', asset: "ATOM"},
    {bal: 1, atom: 4000, name: 'Bitcoin', asset: "BTC", volume: 56239, price: 8034, xprice: 8412},
    {bal: 230, atom: 8000, name: 'Ether', asset: "ETH", volume: 34456, price: 251, xprice: 263},
  ];
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
  this.walletBool = this.walletService.walletBool;
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
  this.amtSwap=this.balAtom;
}
selectBtc(){
  this.swap=true;
  this.asset="BTC";
  this.name = "Bitcoin";
  this.amtSwap=this.balBtc;
}
selectEth(){
  this.swap=true;
  this.asset="ETH";
  this.name="Ether";
  this.amtSwap=this.balEth;
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
  // amtSwap =
}

setAtm(){
  this.outputAsset="ATOM";
  this.outputName="Atom";
}

setBtc(){
  this.outputAsset="BTC";
  this.outputName="Bitcoin";
}

setEth(){
  this.outputAsset="ETH";
  this.outputName="Ether";
}

set25(){
  this.amtSwap = 0.25  * this.balAtom;
}
set50(){
  this.amtSwap = 0.50  * this.balAtom;
}
set75(){
  this.amtSwap = 0.75  * this.balAtom;
}
set100(){
  this.amtSwap = 1.0  * this.balAtom;
}

getOutput(){
  if(this.outputAsset=="BTC"){
    this.output = (this.amtSwap * this.poolBtc) / (this.amtSwap + this.btcAtom)
    this.outputPrice = this.output * this.priceBtc * this.priceAtom;
  } else {
    this.output = (this.amtSwap * this.poolEth) / (this.amtSwap + this.ethAtom)
    this.outputPrice = this.output * this.priceEth * this.priceAtom;
  }

  return this.output;
}

onSubmit() {
  if (this.submitted) {
    this.submitted = false;
  } else {
    this.submitted = true;
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
