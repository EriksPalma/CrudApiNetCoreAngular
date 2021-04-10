import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  ngOnInit(): void {
  }

  value: String[] = ['--', '--', '--', '--', '--', '--', '--', '--', '--'];
  turn = 'O';
  winerStatus = false;

  constructor() { }

  playGame(numero) {
    this.value[numero] = this.turn;
    if (this.turn == 'O') {
      this.turn = 'X'
    } else { this.turn = 'O' }
    let pos = document.getElementById(numero);
    pos.setAttribute("disabled", "");
    this.winner()
  }

  newGame() {
    this.value = ['--', '--', '--', '--', '--', '--', '--', '--', '--']
    for (let index = 0; index < 9; index++) {
      let pos = document.getElementById(index.toString())
      pos.removeAttribute("disabled");
    }
    this.winerStatus = false;
    this.turn = 'O';
  }

  endGame() {
    for (let index = 0; index < 9; index++) {
      let pos = document.getElementById(index.toString())
      pos.setAttribute("disabled", "");
    }
  }

  winner() {
    for (let index = 0; index < 7; index = index + 3) {
      if ((this.value[index] == this.value[index + 1]) && (this.value[index] != '--')) {
        if (this.value[index + 1] == this.value[index + 2]) {
          this.winerStatus = true
          this.endGame();
        }
      }
    }

    for (let index = 0; index < 4; index++) {
      if ((this.value[index] == this.value[index + 3]) && (this.value[index] != '--')) {
        if (this.value[index + 3] == this.value[index + 6]) {
          this.winerStatus = true
          this.endGame();
        }
      }

    }

    if (this.value[0] == this.value[4] && ((this.value[0] != '--'))) {
      if (this.value[4] == this.value[8]) {
        this.winerStatus = true
        this.endGame();
      }
    }

    if (this.value[2] == this.value[4] && ((this.value[2] != '--'))) {
      if (this.value[4] == this.value[6]) {
        this.winerStatus = true
        this.endGame();
      }
    }
  }

}
