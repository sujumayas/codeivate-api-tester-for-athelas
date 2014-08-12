$(document).ready(function(){ 
	
	var athelasTeam = [
			'sujumayas',
			'ondoheer', 
			'kalligos',
			'darkzar',
			'cmrd'
		];

    

	var athelasTeamUl = $('#athelasTeamUl');
	for (var i = 0; i < athelasTeam.length; i++) {
		$.getJSON('http://codeivate.com/users/'+ athelasTeam[i] +'.json?callback=?',
		  function data(data) {

		    //////////////////////////////
		    //			CONFIG			//
		    //////////////////////////////
		    var programming_now_message = "",
		    name = data.name,
		    current_language = data.current_language,
			focus_level = data.focus_level,
			focus_points = data.focus_points,		
			level = data.level,
			max_streak = data.max_streak,	
			programming_now = data.programming_now,
			streaking_now = data.streaking_now,
			time_spent = data.time_spent,
			total_days_coded = data.total_days_coded,
			total_flow_states = data.total_flow_states;

			var expertOn = getBestLanguage(data.languages);
			var time = showTime(time_spent);
			
			var platforms = [];
			for(key in data.platforms){
				var stringPlatform = ''+key+'';
				platforms.push(stringPlatform);
			}

		    //////////////////////////////////
		    //			TEMPLATE			//
		    //////////////////////////////////

		    //First append this user (with name as id) to the athelasTeamUl
		    athelasTeamUl.append('<li class="user" id="'+name+'"></li>');

		    //Then, encapsulate the user for later use
		    var user = '#'+name;
		    var floatingLevel = level - parseInt(level);
		    console.log(floatingLevel);
		    //Then, append all the basic stuff to that user li
			$(user).append('<ul class="basic-stats"><li class="basic-stats-item">'+
				'<h2 class="name">'+name+'</h2></li>'+
				'<li class="basic-stats-item"><div class="progress">'+
				'<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+Math.floor(floatingLevel*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+
				Math.floor(floatingLevel*100)+'%"><span class="sr-only">'+Math.floor(floatingLevel*100)+'% Complete</span></div></div>'+
				'</li></ul><ul class="language-skills">');
			
			//Then we separate the languages-names in an iterable Array
			var languages = [];
			for (key in data.languages) {
				var stringKey = ''+key+'';
				languages.push(stringKey);
				
			}

			//this user language skills:
			var languageSkills = user + ' .language-skills';
			
			//Then we pass one new li for each language:
			for (var i = 0; i < languages.length; i++) {
				if(i < 5){
					$(languageSkills).append('<li class="language"><span class="label">'+languages[i]+'</span><span class="value">0</span></li>');
				}
		    };

			
		    //Then we pass the rest of the info:
			$(user).append('</ul><div class="special-traits"><div class="language-expert"><h4 class="language-expert-title">Experto en:</h4><p class="language-expert-value">'+expertOn+'</p></div><div class="being-coding-for"><h4 class="being-coding-for-title">Lleva programando:</h4><p class="being-coding-for-value">'+time+'</p></div></div><div class="image2"></div><div class="weapons"><ul class="weapons-ul"><li class="weapons-item">'+platforms+'</li></ul></div><div class="image1"></div></li>');

		  }); //End of getJSON(each)

	} //End of For i in athelasTeam
  	
	///////////////////////////////////////////
	///				FUNCTIONS				///
	///////////////////////////////////////////

  	//Retorna el estado de programación actual
    function isProgramming(data){
    	if(data.programming_now) {
	    	programming_now_message = "Is programming right now in ";
	      	programming_now_message += data.current_language + ".";
		  	if(data.streaking_now) {
		    	programming_now_message += " He is in the zone!";
		    }else{
		      	programming_now_message += " He is NOT in the zone! Buu!";}
	    }else{
	      programming_now_message = "Is not programming :(";
	    }

    	return programming_now_message;
    }
    
   	
    //Converting seconds to minutes and hours: 
    function showTime(time){
      var hours = Math.floor(time / 3600);
      time = time - hours * 3600; 
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;

      return " " + hours +"horas, "+minutes+" minutos y "+seconds+" segundos.";

    };

    //Datepicker
    function getTodayDate() {
     var tdate = new Date();
     var day = tdate.getDate(); //yields day
     var month = tdate.getMonth() + 1; //yields month
     var year = tdate.getFullYear(); //yields year
     var todayDate = {
      'days': day,
      'month': month,
      'year': year
      } 

      return todayDate;
    }

    //Esto se podría hacer tan rapido con List Comprehension!!
    function getBestLanguage(languages){
    	var bestPoint = 0;
    	var bestLanguage = "";
    	for (key in languages) {
    		if (languages.hasOwnProperty(key)) {
    			if (languages[key].points > bestPoint) {
    				bestPoint = languages[key].points;
    				bestLanguage = key;
    			}
    		}
    	}
    	return bestLanguage;
    }





  	//Just a console.log automated to show the Today date. 
	console.log((function(){
    	var todayDate = getTodayDate();
    	return todayDate;
    })());

});  //End of jQuery