'use strict';
(function ($) {
	$(document).ready(function() {
		let	id_song, Song,
		volume = 1, 
		songs = songe;

		function playNewSong(id) {		
			let curtime,
			cur = -100;
			$('.audio .nameSong_name').text(songs[id][1]);
			$('title').text(songs[id][1]);
			$('.play').attr('id', id);
			id_song = id;
			Song = new Audio(songs[id][2]);
			$('.play').css({'background':'url(img/icons/player/pause.png) no-repeat center top/cover'});
			$('.song#'+id+' .play-pause_song').css({'background':'url(img/icons/player/pausebutton.png) no-repeat center top/cover'});
			$('.albumcover').attr('src', songs[id][4]);
			$('.muzlog').attr('src', songs[id][4]);

			Song.play();
			Song.volume = volume;
			Song.addEventListener('timeupdate', () => {
				curtime = Song.currentTime;
				cur = -((songs[id_song][3]-curtime)*100)/songs[id_song][3];
				$('.time_play').text(parseInt( curtime/60 )+':'+parseInt(curtime%60));
				$('.progress').css({'left':cur+'%'});
			});
			Song.addEventListener('progress', () => {
				try {
					let	load = Song.buffered.end(0);
					load = -((songs[id_song][3]-load)*100)/songs[id_song][3];
					$('.load').css({'left':load+'%'});
				} catch (err) {
					console.log('the provided index (0) is greater than or equal to the maximum border, everything is fine');
				}
			});

			afterPlay();

			Song.addEventListener('ended', () => {
				Song = new Audio(songs[id++][2]);
				localStorage.setItem('song', JSON.stringify(songs[id]));
				localStorage.setItem('songs', JSON.stringify(songs));
				$('.play').css({'background':'url(img/icons/player/pause.png) no-repeat center top/cover'});
				$('.song#'+id+' .play-pause_song').css({'background':'url(img/icons/player/pausebutton.png) no-repeat center top/cover'});
				if (id != -1) {
					$('.play-pause_song').css({'background':'url(img/icons/player/playbutton.png) no-repeat center top/cover'});
				};

				return playNewSong(id);
				
			});
		}

		function playPauseSong(id) {			
			if (Song) {
				if (id == id_song) {
					if (Song.paused) {
						Song.play();
						Song.volume = volume;
						$('.play').css({'background':'url(img/icons/player/pause.png) no-repeat center top/cover'});
						$('.song#'+id+' .play-pause_song').css({'background':'url(img/icons/player/pausebutton.png) no-repeat center top/cover'});
					} else {
						Song.pause();
						$('.play').css({'background':'url(img/icons/player/play.png) no-repeat center top/cover'});
						$('.song#'+id+' .song').css({'background':'url(img/icons/player/playbutton.png) no-repeat center top/cover'});
					}
				}	else {
					Song.pause();
					$('.play-pause_song').css({'background':'url(img/icons/player/playbutton.png) no-repeat center top/cover'});
					$('.song#'+id+' .play-pause_song').css({'background':'url(img/icons/player/pausebutton.png) no-repeat center top/cover'});
					playNewSong(id);
				}
			} else {
				return playNewSong(id);
			}
		}
		
		function retrySong() {
			if (Song.loop == false){
				Song.loop = true;
			} else {
				Song.loop = false;
				$('.repeat').css({'background':'url(../img/icons/player/repeat.png) no-repeat center top/cover'})
			}
		};

		function afterPlay() {
			if (location.pathname === '/questions_questions_questions_questions.html' && songs[id_song][0] > 35) {
				playNewSong(false);
			} else if (location.pathname === '/level_up_part_one.html' && songs[id_song][0] > 2) {
				playNewSong(false);
			} else if (location.pathname === '/allworld.html' && songs[id_song][0] > 15) {
				// playNewSong(songs[id_song][0] == false)
				// Song.pause();
				playNewSong(false);
				// console.log(24);
				// id_song == -1;
				// Song.currentTime = 0;
			} else if (location.pathname === '/early-morning-and-euphoria.html' && songs[id_song][0] > 44) {  
				playNewSong(false);
			} 
		} 


		$('.repeat').on('click', function() {
			let id = $(this).attr('data-id');
			if (id == -1) {
				$('.repeat').css({'background':'url(../img/icons/player/repeat_one.png) no-repeat center top/cover'})
				retrySong(id);
			}
		});
		
		$('body').on('click', '.song, .play', function(event) {
			let id = $(this).attr('id');
			localStorage.setItem('song', JSON.stringify(songs[id]));
			localStorage.setItem('songs', JSON.stringify(songs));
			$('.play-pause_song').css({'background':'url(img/icons/player/playbutton.png)no-repeat center top/cover'});
			
			playPauseSong(id);
			id++;
			$('.nextbtn#next').attr('data-id', id);
			id--;id--;
			$('.prevbtn#prev').attr('data-id', id);
		});

		$('.nextbtn').on('click', function(){
			let id = $(this).attr('data-id');
			localStorage.setItem('song', JSON.stringify(songs[id]));
			localStorage.setItem('songs', JSON.stringify(songs));
			if (id != -1) {
				$('.play-pause_song').css({'background':'url(img/icons/player/playbutton.png) no-repeat center top/cover'});
				playPauseSong(id);
				id++;
				$('.nextbtn#next').attr('data-id', id);
				id--;id--;
				$('.prevbtn#prev').attr('data-id', id);
				afterPlay();
			}
		});

		$('.prevbtn').on('click', function() {
			let id = $(this).attr('data-id');
			if (id != -1) {
				$('.play-pause_song').css({'background':'url(img/icons/player/playbutton.png) no-repeat center top/cover'});
				playPauseSong(id);
				id++;
				$('.nextbtn#next').attr('data-id', id);
				id--;id--;
				$('.prevbtn#prev').attr('data-id', id);
				afterPlay();
			}
		});		

		$('#myRange').on('change', function() {
			let val = $(this).val();
			if (Song){
				volume = val/100;
				Song.volume = volume;
			}
		});

		$('.range').on('mouseenter', function() {
	    if (Song) {
	      let id = $('.play').attr('id'),
	      offset = $(this).offset(),
	      dur = songs[id][3],
	      w = $(this).width();
	      $('.setTime').show();
	      $('.range').on('mousemove', function(e) {
	        let  x = e.pageX - offset.left,
	        xproc = (x*100)/w,
	        sec = (xproc*dur)/100;
	        $('.setTime').css({'left':x - 40});
	        $('.setTime').text(parseInt(sec/60)+':'+parseInt(sec%60));
	        $('.range').on('click', function() {
	          xproc = xproc-100;
	          $('.progress').css({'left':xproc+'%'});
	          Song.currentTime = sec;
	        })
				});
				
	      $('.range').on('mouseout', function() {
	      	$('.setTime').hide();
	      })
	  	}
		});
	
		window.addEventListener('storage', function(){
			Song.pause();
			$('.play').css({'background':'url(img/icons/player/play.png) no-repeat center top/cover'});
			$('.play-pause_song').css({'background':'url(img/icons/player/playbutton.png) no-repeat center top/cover'});	
			console.log('Песня на паузе');
		})
	})
})(jQuery);