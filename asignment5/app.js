var app = angular.module('matchApp', ['ngRoute']);

app.controller('mainController',['$http',function($http) {

// function call hi nhi ho rha tha
$("#team1Names").on("change",function(){
    var selectedTeam1Name = this.value;
    findTeamDetails(selectedTeam1Name);
});
$("#team2Names").on("change",function(){
    var selectedTeam2Name = this.value;
    findTeam2Details(selectedTeam2Name);
});



console.log("in controller");
  //create a context
  var main = this;

  this.totalMatches = [];
  this.rounds1 = [];
  this.rounds2 = [];
  this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.baseUrl2 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';

  this.loadFirst = function(){
    $http({
        method: 'GET',
        url: main.baseUrl1
      }).then(function successCallback(response) {
          main.rounds1 = response.data.rounds;
          console.log(main.rounds1);
          console.log("firstfunction");

         
          main.round1Teams = [];
          main.uniqueTeams = [];
          for (round in main.rounds1){
            for (match in main.rounds1[round].matches){
              main.round1Teams.push(main.rounds1[round].matches[match]);
              console.log("first for loop");
            }
          }

          for (i in main.round1Teams){
            if(main.uniqueTeams.indexOf(main.round1Teams[i].team1.name) === -1){
              main.uniqueTeams.push(main.round1Teams[i].team1.name);

              console.log("second for loop");

            }
          }
          // console.log("main.uniqueTeams are -----"+main.uniqueTeams);

          findTeamDetails=function(selectedTeam1Name){
            main.season1=response.data;
            // console.log("inside find team details function");
            main.won=0;
            main.lost=0;
            main.totalMatches=0;
            main.tie=0;
            for (round in main.season1.rounds){
              console.log("looking for team");
              for(match in main.season1.rounds[round].matches){

                if(main.season1.rounds[round].matches[match].team1.name == selectedTeam1Name){
                  // console.log("found in team 1");
                  if(main.season1.rounds[round].matches[match].score1>main.season1.rounds[round].matches[match].score2){
                    main.won = main.won+1;

                  }

                  else if(main.season1.rounds[round].matches[match].score1<main.season1.rounds[round].matches[match].score2){
                    main.lost=main.lost+1;
                  }
                  else{
                    main.tie=main.tie+1;
                  }
                }
                else if(main.season1.rounds[round].matches[match].team2.name == selectedTeam1Name){
                  // console.log("found in team 2");
                  if(main.season1.rounds[round].matches[match].score1<main.season1.rounds[round].matches[match].score2){
                    main.won = main.won+1;
                  }
                  else if(main.season1.rounds[round].matches[match].score1>main.season1.rounds[round].matches[match].score2){
                    main.lost=main.lost+1;
                  }
                  else{
                    main.tie=main.tie+1;
                  }
                }
                else{
                  // console.log("Not found in any team");
                }
              }
              console.log(main.won);

            }
            main.totalMatches = main.won+main.lost+main.tie;
          }
          // console.log("out of find team details");
        }, function errorCallback(response) {
          alert("some error occurred. Check the console.");
          console.log(response);
        })
  };
  this.loadFirst() // calling loadFirst method


  this.loadSecond = function(){
    $http({
        method: 'GET',
        url: main.baseUrl2
      }).then(function successCallback(response) {
          // console.log(response);
          main.rounds2 = response.data.rounds;
          console.log(main.rounds2);
         


          main.round2Teams = [];
          main.uniqueTeams2 = [];
          for (round in main.rounds2){
            for (match in main.rounds2[round].matches){
              main.round2Teams.push(main.rounds2[round].matches[match]);
            }
          }

          for (i in main.round2Teams){
            if(main.uniqueTeams2.indexOf(main.round2Teams[i].team1.name) === -1){
              main.uniqueTeams2.push(main.round2Teams[i].team1.name);
            }
          }
          // console.log("main.uniqueTeams are -----"+main.uniqueTeams);

          findTeam2Details=function(selectedTeam2Name){
            main.season2=response.data;
            // console.log("inside find team details function");
            main.won2=0;
            main.lost2=0;
            main.totalMatches2=0;
            main.tie2=0;
            for (round in main.season2.rounds){
              for(match in main.season2.rounds[round].matches){

                if(main.season2.rounds[round].matches[match].team1.name == selectedTeam2Name){
                  // console.log("found in team 1");
                  if(main.season2.rounds[round].matches[match].score1>main.season2.rounds[round].matches[match].score2){
                    main.won2 = main.won2+1;
                  }
                  else if(main.season2.rounds[round].matches[match].score1<main.season2.rounds[round].matches[match].score2){
                    main.lost2=main.lost2+1;
                  }
                  else{
                    main.tie2=main.tie2+1;
                  }
                }
                else if(main.season2.rounds[round].matches[match].team2.name == selectedTeam2Name){
                  console.log("found in team 2");

                  if(main.season2.rounds[round].matches[match].score1<main.season2.rounds[round].matches[match].score2){
                    main.won2 = main.won2+1;
                  }
                  else if(main.season2.rounds[round].matches[match].score1>main.season2.rounds[round].matches[match].score2){
                    main.lost2=main.lost2+1;
                  }
                  else{
                    main.tie2=main.tie2+1;
                  }
                }
                else{
                  // console.log("Not found in any team");
                }
              }

            }
            main.totalMatches2 = main.won2+main.lost2+main.tie2;
          }
          // console.log("out of find team details");
        }, function errorCallback(response) {
          alert("some error occurred. Check the console.");
          console.log(response);
        })
  };
  this.loadSecond() // calling loadFirst method

}]); // controller ends
