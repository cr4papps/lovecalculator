import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
})

export class AppComponent {
  n1 = "";
  n2 = "";

  calculate() {
    let name1 = new Name(this.n1);
    let name2 = new Name(this.n2);

    let names = [name1, name2];
    let concatenatedNames = (name1.str + name2.str).replace(/ /g, '');

    for (let name of names) {
      let checkedCharacters = [];
      for (let s of name.str) {
        if (checkedCharacters.indexOf(s) < 0 && s != ' ') {
          var r = new RegExp(s, "g");
          if ((concatenatedNames.match(r) || []).length > 1) {
            name.found += (name.str.match(r) || []).length;
          } else {
            name.notFound++;
          }
          checkedCharacters.push(s);
        }
      }
    }
    console.log(name1.toString());
    console.log(name2.toString());

    var overallScore = (name1.getTotalScore() + name2.getTotalScore()) / 4;
    console.log(overallScore);
  }
}

export class Name {
  str: string;
  found: number = 0;
  notFound: number = 0;
  scores: number[] = [90, 75, 50, 100];

  constructor(str: string) {
    this.str = str.toLowerCase();
  }

  getScore(num: number): number {
    let j = 0;
    for (var i = 0; i < num; i++) {
      j++;
      if (j > 4) {
        j = 1;
      }
    }
    return this.scores[j - 1];
  }

  getTotalScore(): number {
    var initialScore = this.getScore(this.found);
    var afterScore = this.getScore(this.notFound);
    return initialScore + afterScore;
  }

  toString(): string {
    var initialScore = this.getScore(this.found);
    var afterScore = this.getScore(this.notFound);
    return `[ Name: ${this.str}, Found: ${this.found}, Initial Score: ${initialScore}, Not Found: ${this.notFound}, After Score: ${afterScore}]`;
  }
}