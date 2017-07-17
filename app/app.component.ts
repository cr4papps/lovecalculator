import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
})

export class AppComponent {
  n1 = "";
  n2 = "";

  n1love = "";
  n2love = "";
  percentage = "";

  calculate() {
    let name1 = new Name(this.n1);
    let name2 = new Name(this.n2);

    // let names = [name1, name2];
    // let concatenatedNames = (name1.strLowered + name2.strLowered).replace(/ /g, '');

    // let i = 0;
    // for (let name of names) {
    //   let checkedCharacters = [];
    //   let concatenatedNames = "";
    //   if (i == 0) {
    //     concatenatedNames = name2.strLowered;
    //   } else {
    //     concatenatedNames = name1.strLowered;
    //   }
    //   for (let s of name.strLowered) {
    //     if (checkedCharacters.indexOf(s) < 0 && s != ' ') {
    //       var r = new RegExp(s, "g");
    //       if ((concatenatedNames.match(r) || []).length > 1) {
    //         name.charFound += (name.strLowered.match(r) || []).length;
    //       } else {
    //         name.charNotFound++;
    //       }
    //       checkedCharacters.push(s);
    //     }
    //   }
    //   i++;
    // }

    name1.find(name2);
    name2.find(name1);

    console.log(name1.toString());
    console.log(name2.toString());

    var overallScore = (name1.getTotalScore() + name2.getTotalScore()) / 4;
    console.log("Total Score: " + overallScore);

    this.n1love = name1.str + " (" + name1.getInitialLoveScore() + " -> " + name1.getFinalLoveScore() + ")";
    this.n2love = name2.str + " (" + name2.getInitialLoveScore() + " -> " + name2.getFinalLoveScore() + ")";

    this.percentage = "Overall Success in Life: " + overallScore.toString();
  }
}

export class Name {
  strLowered: string;
  charFound: number = 0;
  charNotFound: number = 0;
  scores: number[] = [90, 75, 50, 100];
  str: string;

  constructor(str: string) {
    this.str = str.trim();
    this.strLowered = str.trim().toLowerCase();
  }

  getScore(num: number): number {
    let j = 0;
    for (var i = 0; i < num; i++) {
      if (j > 4) {
        j = 1;
      }
      j++;
    }
    if (j > 4) {
      j = 1;
    }
    return this.scores[j - 1];
  }

  find(name: Name) {
    for (var c of this.strLowered.replace(/ /g, '')) {
      if (name.strLowered.search(c) > -1) {
        this.charFound++;
      } else {
        this.charNotFound++;
      }
    }
  }

  getInitialLoveScore(): number {
    return this.getScore(this.charFound);
  }

  getFinalLoveScore() : number {
    return this.getScore(this.charNotFound);
  }

  getTotalScore(): number {
    var initialScore = this.getInitialLoveScore();
    var finalScore = this.getFinalLoveScore();
    return initialScore + finalScore;
  }

  toString(): string {
    var initialScore = this.getInitialLoveScore();
    var afterScore = this.getFinalLoveScore();
    return `[ Name: ${this.str}, Found: ${this.charFound}, Initial Score: ${initialScore}, Not Found: ${this.charNotFound}, After Score: ${afterScore}]`;
  }
}