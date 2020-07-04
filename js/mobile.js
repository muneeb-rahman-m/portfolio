var space = new Kinetic.Layer();
window.onload = function init()
{
	var inwidth = 260;
	var inheight = 420;
	var mobile = new Kinetic.Stage({
		container: 'inner',
		width: inwidth,
		height: inheight
	});

	var menu = new Kinetic.Layer();
	var space = new Kinetic.Layer();
	var bubbles = new Kinetic.Layer();
	var lockarea = new Kinetic.Layer();
	var time = new Kinetic.Layer();
	var cover = new Kinetic.Layer();
	var fnt = new Kinetic.Layer();

	// global variables declaration
	var layer = 0;
	var count = 0;
	var gameload = false;
	var lock = true;
	var clicked = false;
	var backinplay = true;
	var keyinplay = true;
	var hr,mn,fr,dt,hrf,frf,dtf,clr;

	//image declaration
	var bg1 = new Image();
	var bg2 = new Image();
	var lk = new Image();
	var unlock = new Image();
	var unlockd = new Image();
	var insd = new Image();
	var bk = new Image();
	var A1 = new Image();
	var ct = new Image();
	var mg = new Image();
	var ap = new Image();
	var cl = new Image();
	var top = new Image();
	var home = new Image();
	var gameico = new Image();
	A1.src = "images/greentree.jpg";
	ct.src = "images/cont.png";
	mg.src = "images/msg.png";
	ap.src = "images/app.png";
	cl.src = "images/call.png";
	bk.src = "images/back.png";
	lk.src = "images/lock.png";
	bg1.src = "images/s3.png";
	bg2.src= "images/img3.png";
	unlock.src = "images/unlock.png";
	unlockd.src = "images/unlockd.png";	
	insd.src = "images/green.jpg";
	top.src = "images/s3_top.png";
	home.src ="images/main.png";
	gameico.src = "images/game.png";
	function clock(layer,h,m,f,d,hx,hy,hf,fx,fy,ff,dx,dy,df,clr){
		var ctx = layer.getContext();
		var t = new Date();
		var l = t.toString();
		d = l.slice(0,10);
		var Hour = t.getHours();
		var Min = t.getMinutes();
		var hour,min,format;
		if(Hour>12)
		{
			hour = Hour - 12;
			if(hour<9)
			{
				h = "0"+hour;
			}
			else
			{
				h = hour;
			}
		}
		else
		{
			if(Hour < 10)
			{
				h = "0" + Hour;
			}
			else
			{
				h = Hour;
			}
		}
		if(Min<10)
		{
			m = "0"+Min;
		}
		else
		{
			m = Min;
		}
		
		if(Hour>11)
		{
			f = "PM";
		}
		else
		{
			f = "AM";
		}
		
		ctx.shadowColor = "black";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 10;
		ctx.font = hf;
		ctx.fillStyle = clr;
		ctx.fillText(h+":"+m, hx,hy);
		ctx.font = ff;
		ctx.fillText(f,fx,fy);
		ctx.font = df;
		ctx.fillText(d,dx,dy);
	}
		function draw(){
			time.clear();
			hrf = "25pt android";
			frf = "10pt android";
			dtf = "12pt android";
			clr = "white";
			clock(time,hr,mn,fr,dt,40,100,hrf,210,100,frf,45,130,dtf,clr);
		}


	var lck = new Kinetic.Image({
		image: lk,
		x:100,
		y:260,
		width: 50,
		height: 50,
		draggable: true,
		dragBoundFunc: function(pos){
			var x = 100;
			var y = 255;
			var radius = 100;
			var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
			if(scale<1)
			return{
				y: Math.round((pos.y - y) * scale + y),
                x: Math.round((pos.x - x) * scale + x)
			};
			else
				return pos;
		}
	});
	lockarea.add(lck);
	mobile.add(bubbles);
	mobile.add(time);
	mobile.add(cover);
	mobile.add(lockarea);
	mobile.add(fnt);
	mobile.add(menu);
	mobile.add(space);
	setInterval(draw,900);
	fnt.hide();
	menu.hide();
	space.hide();

	function cir(){
		var ctx = cover.getContext();
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = .5;
		ctx.arc(130,280,100,(Math.PI/180)*10,(Math.PI/180)*350,false);
		ctx.stroke();
		ctx.closePath();
		ctx.drawImage(unlock,200,255);
	}
	window.addEventListener('mousedown',lclick,false);
	function lclick(e)
	{
		var pos = inner.getBoundingClientRect();
		var posx = e.clientX - pos.left;
		var posy = e.clientY - pos.top;
		if(posx>=100 && posx<=150 && posy>=260 && posy<=310)
		{
			clicked = true;
			window.removeEventListener('mousedown',lclick,false);
		}
	}


	screensaver();
	function screensaver(){
		var ctx = bubbles.getContext('2d');
		var moveon;
		var circles = [];
		var tot = 0;
		var ncircle = 2;
		var circlerate = 1500;
		var nw = Date.now();
		var session = true;
		window.onblur = blr;
		window.addEventListener('mousemove',moveit,false);
		function moveit(e)
		{
			session = true;
		}
		function blr()
		{
			session = false;
		}
		var raf = window.requestAnimationFrame || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame|| 
                  window.msRequestAnimationFrame ||
                  window.oRequestAnimationFrame||
                  function(callback)
                  {
                  	window.setTimeout(callback,1000/60);
                  };
		init();
		var startTime = undefined;
		var dis;
		function init()
		{
		  draw();
		}
		 
		function draw()
		{
			raf(draw);
			drawcircles();		
		}
		drawcls();
		function nofcircle(x)
		{
		  for(var i = 0;i<=x;i++)
		  {
		    circles[tot] = new circle();
		    tot++;
		  }
		}
		function drawcircles()
		{
		  bubbles.clear();
		  ctx.drawImage(bg2,0,0,260,420);
		  if(!clicked)
		  	{
		  		ctx.drawImage(lk,100,260,50,50);
		  	}
		  for(var i=0;i<circles.length;i++)
		  {
		    circles[i].draw();
		  }
		}
		function drawcls()
		{
		  clearInterval(moveon);
		  moveon = setInterval(function(){
		  	if(session)
		  	{
		  		nofcircle(ncircle);	
		  	}
		  	
		  },circlerate);
		}

		function circle()
		{
		  this.x = Math.floor(Math.random()*260);
		  this.y =440+ Math.floor(Math.random()*150);
		  this.radius = 20 + Math.floor(Math.random()*20);
		  this.move = 1+Math.floor(Math.random()*5);
		  this.colred = Math.floor(Math.random()*255);
		  this.colgreen = Math.floor(Math.random()*255);
		  this.colblue = Math.floor(Math.random()*255);
		}

		circle.prototype.draw = function(callback){
		  	this.y -= this.move;
		  	ctx.beginPath();
		  	ctx.strokeStyle="rgba("+this.colred+","+this.colgreen+","+this.colblue+","+1+")";
		  	ctx.lineWidth = 3;
		  	ctx.arc(this.x,this.y,this.radius,0,(Math.PI/180)*360,false);
		  	ctx.stroke();
		  	ctx.closePath();
		  	this.movement();
		  	this.lastime= Date.now();};
		circle.prototype.movement = function(){
		  switch(this.move)
		  {
		    case 1:
		            this.x+= .4;
		            break;
		    case 2:
		            this.x-= .4;
		            break;
		    case 3:
		            this.x+= .6;
		            break;
		    case 4:
		            this.x-=.6;
		            break;
		    case 5:
		            this.x+=.8;
		            break;
		    case 6: this.x-=.8;
		            break;
		  }
		  this.escaped();  
		};
		circle.prototype.escaped = function(){
		    if(this.y<=-2000)
		    {
		      this.removeCircle();
		    }
		};
		circle.prototype.removeCircle = function(){
		  circles.splice(circles.indexOf(this),1);
		  tot--;
		};
	}
	lck.on('dragmove',function(){
		cover.clear();
		clicked = true;
		cir();
		var mousex = lck.getPosition().x;
		var mousey = lck.getPosition().y;
		var ctx = cover.getContext();
			if(mousex>=200&& mousex<=250&&mousey>=255 && mousey<=315)
			{
				ctx.drawImage(unlockd,200,255);
					lock = false
					var cnht = 0;
					time.hide();
					lockarea.hide();
					bubbles.hide();
					cover.hide();
					lck.setPosition(120,300);
					if(!lock)
					{
						inside();	
					}
					
					layer = 1;
			}});
	lck.on('dragend',function(){
		cover.clear();
		var posx = lck.getPosition().x;
		var posy = lck.getPosition().y;
		var destx = 100;
		var desty = 260;
		function anim(){
			
			if(posx>=destx && posy>=desty)
			{
				if(posx!=destx || posy!= desty)
				{
					lockarea.clear();
					if(destx == posx)
					{
						posx = posx;
					}
					else
					{
						posx--;
					}
					if(desty == posy)
					{
						posy = posy;
					}
					else
					{
						posy--;
					}
					lck.setPosition(posx,posy);
					lockarea.draw();
				}
				
			}
			else if(posx<=destx && posy>=desty)
			{
				if(posx!=destx || posy!= desty)
				{
					lockarea.clear();
					
					if(posx == destx)
					{
						posx = posx;
					}
					else
					{
						posx++;
					}
					if(posy == desty)
					{
						posy = posy;
					}
					else
					{
						posy--;
					}
					lck.setPosition(posx,posy);
					lockarea.draw();	
				}
				
			}
			else if(posx<=destx && posy<=desty)
			{
				if(posx!=destx || posy!= desty)
				{
					lockarea.clear();
					
					if(posy == desty)
					{
						posy = posy;
					}
					else
					{
						posy++;
					}
					if(posx == destx)
					{
						posx = posx;
					}
					else
					{
						posx++;
					}
					lck.setPosition(posx,posy);
					lockarea.draw();	
				}
				
			}
			else if(posx>=destx && posy<=desty)
			{
				if(posx!=destx || posy!= desty)
				{
					lockarea.clear();
					
					if(posy == desty)
					{
						posy = posy;
					}
					else
					{
						posy++;
					}
					if(posx == destx)
					{
						posx = posx;
					}
					else
					{
						posx--;
					}
					lck.setPosition(posx,posy);
					lockarea.draw();	
				}
				
			}
		
		}
		setInterval(anim,1);
	});
	 var inplay = false;
	$("#back").click(function(){
			
				if(layer == 1)
				{
					time.show();
					lockarea.show();
					lockarea.draw();
					cover.show();
					bubbles.show();
					fnt.hide();
					window.removeEventListener('click',iclick,false);
					layer = 0;
				}
				if(layer == 2)
				{
					menu.hide();
					space.hide();
					fnt.show();
					layer = 1;
				}
				if(layer == 3)
				{
					space.hide();
					menu.show();
					layer = 2;
				}
				if(backinplay)
				{
					if(layer==4)
					{
				  		inplay = true;	
				  		keyinplay = false;
					}	
				}
				
			
	});

	function inside(){
		fnt.show();	
		fnt.draw();
		var a1 = new Kinetic.Image({
			x: 20,
			y: 70,
			image: A1,
			width:240,
			height:160,
			shadowColor: 'black',
			shadowBlur:15,
			shadowOffset: 0,
			shadowOpacity:1,
			cornerRadius:10
		});
		$('#inner').ready(function(){
			window.addEventListener('click',iclick,false);
		});
		}
		function fnts()
		{
			hrf = "26pt android";
			frf = "14pt android";
			dtf = "20pt tahoma";
			clr = "white";
			var ctx = fnt.getContext('2d');
			var disp = new Image();
			var bg = new Image();
			disp.src = "images/greentree.jpg";
			ctx.clearRect(0,0,260,300);
			ctx.drawImage(insd,0,0,260,420);
			ctx.drawImage(top,0,0);
			ctx.fillStyle = "rgba(20,20,20,.3)";
			ctx.fillRect(0,360,260,60);
			ctx.drawImage(cl,25,375,30,30);
			ctx.drawImage(ct,85,375,30,30);
			ctx.drawImage(mg,145,375,30,30);
			ctx.drawImage(ap,205,375,30,30);
			ctx.font = "10pt Tahoma";
			ctx.fillStyle = "white";
			clr="#F1C40F";
			var t = new Date();
			var year = t.getFullYear();
			var month = 1+t.getMonth();
			var str = t.toString();
			year = year.toString();
			month = month.toString();
			year = year.slice(2,4);
			str = str.slice(0,3);
			if(month<10)
			{
				month = "0"+month;
			}
			else
			{
				month = month;
			}
			clock(fnt,hr,mn,fr,dt,200,15,"10pt tahoma",235,15,"8pt tahoma",270,15,dtf,clr);
			ctx.drawImage(disp,10,40,240,140);
			clr="white";
			clock(fnt,hr,mn,fr,dt,20,70,hrf,200,70,frf,270,15,dtf,clr);
			ctx.font = "12pt android";
			ctx.fillStyle = "#F1C40F";
			ctx.fillText(str,40,170);
			ctx.fillStyle = "white"
			ctx.fillText(month+" / "+year,120,170);
			ctx.fill();
		}

		clearInterval(fnts);
		setInterval(fnts,100);
		
		function iclick(e)
		{
			var pos = inner.getBoundingClientRect();
        	var posx = e.clientX - pos.left;
			var posy = e.clientY - pos.top;
        
	       if(posx>=205 && posx<=235 && posy>=375 && posy<=405)
	        {
	        	switch(count)
	        	{
	        		case 0: fnt.hide();
	        				he();
	        				count = 1;
	        				layer = 2;
	        				break;
	        		case 1: heh();
	        				count = 0;
	        				layer = 1;
	        				break;
	        	}
	        }	
		}
    	function he()
		{
    		menu.show();
    		gameload = false;
    		if(!gameload)
    		{
    			$('#inner').ready(function(){
    			window.addEventListener('click',mclick,false);
	    			function mclick(e)
	    			{
	    				var pos = inner.getBoundingClientRect();
			        	var posx = e.clientX - pos.left;
						var posy = e.clientY - pos.top;
			        	if(posx>=22 && posx<=58 && posy>=42 && posy<=76)
			        	{
			        		fnt.hide();
							menu.hide();
							layer = 3;
			    			space.show();
			    			spaceshooters();    	
			        	}	
	    			}
	    		
	    		});

    		}
    	}	
    		function list()
    		{
    			menu.draw();
    			var ctx = menu.getContext('2d');
    			var clr = "#F1C40F";
    			ctx.clearRect(0,0,260,40);
    			ctx.drawImage(insd,0,0,260,420);
    			ctx.drawImage(top,0,0);
    			ctx.fillStyle = "white";
    			clock(menu,hr,mn,fr,dt,200,15,"10pt tahoma",235,15,"8pt tahoma",270,15,dtf,clr);
    			ctx.fillStyle = "rgba(40,40,40,.2)";
    			ctx.fillRect(0,20,260,340);
    			ctx.fillStyle = "rgba(40,40,40,.2)";
				ctx.fillRect(0,360,260,60);
				ctx.drawImage(cl,25,375,30,30);
				ctx.drawImage(ct,85,375,30,30);
				ctx.drawImage(mg,145,375,30,30);
				ctx.drawImage(home,205,375,30,30);
    			ctx.drawImage(gameico,20,40);
    		}
    		clearInterval(list);
    		setInterval(list,900);
			function heh(){
			gameload = true;
			layer = 1;
			menu.hide();
			fnt.show();
			}
			var inbetween = false;
		// game function begins
		function spaceshooters(){
			    var ctx = space.getContext('2d');
			    var image = new Image();
				image.src = "images/gamesprite.png";
				var y=0;
				var player = new jet();
				var ammo = new Bullet();
				var date = new Date();
				var boss = new Boss();
				var miss = new missile();
				var moveone;
				var moveonbe;
				var enemies = [];
				var tot = 0;
				var nenemies = 1;
				var enemyrate = 1000;
				var benemies = [];
				var btot = 0;
				var nbenemies = 1;
				var count = 0;
				var benemyrate = 10000;
				var score = 0;
				var startup = 0;
				var loading = true;
				//var sec = date.getSeconds();
				var efast = 1.5;
				var totalhits = 0;
				var ey = 400;
				var ctr = 0;
				var cross = 0;
				var playing = true;
				var enemydrawing = true;
				var raf = window.requestAnimationFrame || 
			                  window.webkitRequestAnimationFrame || 
			                  window.mozRequestAnimationFrame|| 
			                  window.msRequestAnimationFrame ||
			                  window.oRequestAnimationFrame||
			                  function(callback)
			                  {
			                  	window.setTimeout(callback,1000/60);
			                  };
				image.addEventListener('load',init,false);
				var ld = new Image();
				ld.ready = false;
				ld.onload = loads;
				function loads()
				{
					this.ready = true;

				}
				ctx.fillStyle = "rgb(230,230,230)";
				ctx.fillRect(0,0,260,420);
				ctx.fillStyle = "black";
				ctx.font = "18pt tahoma";
				ctx.fillText('loading...',100,210);
				setInterval(preload);
				function preload()
				{
					if(ld.ready)
					{
						clearInterval(preload);
						init();
					}
				}
				function init()
				{
					ld.ready = false;
				  drawui();
				  
				}
				function game(){
					draw();
				  	drawenemy();
				  	drawbenemy();
				  	document.addEventListener('keydown',keypressed,false);
				  	document.addEventListener('keyup',keyreleased,false);		
				  	layer = 4;	
				}
				function drawui(){
				  ctx.drawImage(image,260,0,260,420,0,0,260,420);
				  $('inner').ready(function(){
				  	window.addEventListener('click',clicked,false);	
				  });}
				function clicked(e){
				  var pos = inner.getBoundingClientRect();
				  var posx = e.clientX - pos.left;
				  var posy = e.clientY - pos.top;
				  if(posx>=82 && posx<=178 && posy>=144 && posy<= 188)
				  {
				    game();
				    keyinplay = true;
				    backinplay = true;
				    window.removeEventListener('click',clicked,false);
				  }
				  if(posx>=82 && posx<=178 && posy>=224 && posy<= 268)
				  {
				    ctx.drawImage(image,260,420,260,420,0,0,260,420);
				    window.removeEventListener('click',clicked,false);
				    window.addEventListener('click',helpclick,false);
				  }
				  if(posx>=82 && posx<=178 && posy>=304 && posy<= 348)
				  {
				    ctx.drawImage(image,260,840,260,420,0,0,260,420);
				    window.removeEventListener('click',clicked,false);
				    window.addEventListener('click',exitclick,false);
				  }}
				function helpclick(e){
				  var pos = inner.getBoundingClientRect();
				  var posx = e.clientX - pos.left;
				  var posy = e.clientY - pos.top;
				  if(posx>=82 && posx<=178 && posy>=324 && posy<=368)
				  {
				    drawui();
				    window.removeEventListener('click',helpclick,false);
				  }}
				function exitclick(e){
				  var pos = inner.getBoundingClientRect();
				  var posx = e.clientX - pos.left;
				  var posy = e.clientY - pos.top;
				  if(posx>=82 && posx<=178 && posy>=124 && posy<=168)
				  {
				    space.hide();
				    menu.show();
				    return;
				    window.removeEventListener('click',exitclick,false);
				  }
				  if(posx>=82 && posx<=178 && posy>=204 && posy<=248)
				  {
				  	drawui();
				    window.removeEventListener('click',exitclick,false);
				  }}
				  function draw(){
				  	if(inplay)
				  	{
				  		playing = false;
				  		enemydrawing = false;
				  		ctx.drawImage(image,260,1260,260,420,0,0,260,420);
					    window.addEventListener('click',rclick,false);
					    inplay = false;
				  	}
					if(playing)
					{
					   drawbg();
					   drawenemies();
					   drawbenemies();
					   player.draw();
					   if(player.life!=0)
					   {
					   	sre();	
					   }
					   
					   raf(draw); 
					 }}
					function sre(){
				  ctx.font = "15pt tahoma bold";
				  ctx.fillStyle = "#a90505";
				  ctx.fillText("Score "+score,2,18);}
				
				function drawbg(){
				  y+=.8;
				  ctx.clearRect(0,0,260,420);
				  if(y>=0)
				  {
				    ctx.drawImage(image,0,y-580);
				    if(y>=580)
				    {
				      y=0;
				    }
				  }
				  
				  if(player.life>=3)
				  {
				    ctx.drawImage(image,0,1000,48,90,170,0,25,35);
				    ctx.drawImage(image,0,1000,48,90,200,0,25,35);
				    ctx.drawImage(image,0,1000,48,90,230,0,25,35);
				  }
				  if(player.life==2)
				  {
				    ctx.drawImage(image,0,1000,48,90,200,0,25,35);
				    ctx.drawImage(image,0,1000,48,90,230,0,25,35);
				  }
				  if(player.life==1)
				  {
				    ctx.drawImage(image,0,1000,48,90,230,0,25,30);
				  }
				  if(player.life==0)
				  {
				  	enemydrawing = false;
				  }
				  if(loading){
					  if(startup>=0)
					  {
						startup++;
						if(startup<=55)
						{
						    ctx.font = "32pt Tahoma";
						    ctx.fillStyle = "edff27";
						    ctx.fillText("Get Ready!!",20,250);  
						}
					    if(startup>65 && startup<130)
					    {
					      ctx.font = "48pt Tahoma bold";
					      ctx.fillStyle = "rgb(255,60,60)";
					      ctx.fillText("3",120,250);  
					    }
					    if(startup>145 && startup<210)
					    {
					      ctx.font = "48pt Tahoma bold";
					      ctx.fillStyle = "rgb(255,193,37)";
					      ctx.fillText("2",120,250);  
					    }
					    if(startup>215 && startup<280)
					    {
					      ctx.font = "48pt Tahoma bold";
					      ctx.fillStyle = "rgb(0,238,118)";
					      ctx.fillText("1",120,250);  
					    }
					  }
				  		if(startup>300)
				  		{
				    		startup = -10;
				  		}}}
				function nofenemy(x){
				  for(var i = 0;i<x;i++)
				  {
				    enemies[tot] = new enemy();
				    tot++;
				    cross+=1;
				    if(cross>=250)
				    { 
				      cross = 0;
				    }
				  }}
				function drawenemies(){
				  for(var i=0;i<enemies.length;i++)
				  {
				    enemies[i].draw();
				  }}
				function drawenemy(){
				  clearInterval(moveone);
				  moveone = setInterval(function(){
				  	if(enemydrawing)
				  	{
				  		nofenemy(nenemies);
				  	}
				  	
				  },enemyrate);}
				// draw bigenemies
				function nofbenemy(x){
				  for(var i = 0;i<x;i++)
				  {
				    benemies[btot] = new benemy();
				    btot++;
				  }}
				function drawbenemies(){
				  for(var i=0;i<benemies.length;i++)
				  {
				    benemies[i].draw();

				  }}
				function drawbenemy(){
				  clearInterval(moveonbe);
				  moveonbe = setInterval(function(){
				  	if(enemydrawing)
				  	{
				  		nofbenemy(nbenemies);	
				  	}
				  	
				  },benemyrate);}
				function stopdrawing(){
				  clearInterval(moveon);
				}
				// jet Player object
				function jet(){
				  this.x = 125;
				  this.y = 320;
				  this.width = 48;
				  this.height = 100;
				  this.srcx = 0;
				  this.srcy = 1000;
				  this.speed = 3;
				  this.radius = 0;
				  this.collsucc = 50;
				  this.recovery = 100;
				  this.bulletsrx = this.x+15;
				  this.bulletsry = this.y-50;
				  this.bulletslx = this.x + 25;
				  this.bulletsly = this.y - 50;
				  this.collided = false;
				  this.frames = 5;
				  this.life = 3;
				  this.up = false;
				  this.down = false;
				  this.left = false;
				  this.right = false;
				  this.shoot = false;
				  this.startshoot = false;
				  this.currentshot = 0;
				  this.bulletsr = [];
				  this.bulletsl = [];
				  this.missiles = [];
				  this.collided = false;
				  this.explode = new Explode();
				  for(var i =0; i<10;i++)
				  {
				    this.bulletsr[this.bulletsr.length] = new Bullet();
				    this.bulletsl[this.bulletsl.length] = new Bullet();
				  }}
				jet.prototype.draw = function(){
				  if(this.life>0)
				  {
				    this.flip();
				    this.controls();
				    this.bulletsrx = this.x+15;
				    this.bulletsry = this.y;
				    this.bulletslx = this.x + 25;
				    this.bulletsly = this.y;
				    this.checkshoot();
				    this.drawbullets();
				    this.collision();
				  }
				  if(this.life ==0)
				  {
				  	/*ctx.drawImage(image,260,1680,260,420,0,0,260,420);
					window.addEventListener('click',gclick,false);
				  	playing = false;
				    ctx.fillText(score,200,120);
				    function gclick(e)
				    {
				    	var pos = inner.getBoundingClientRect();
				  		var posx = e.clientX - pos.left;
				  		var posy = e.clientY - pos.top;
				    }*/
				  }
				};
				jet.prototype.controls = function(){
				    if(this.y>=0)
				    {
				      if(this.up)
				      {
				      this.y-=this.speed;
				      }
				    }
				    
				    if(this.y<=320)
				    {
				      if(this.down)
				      {
				        this.y+=this.speed;
				      }
				    }
				    if(this.x>=0)
				    {
				      if(this.left)
				      {
				        this.x -= this.speed;
				      }
				    }
				    if(this.x<=210)
				    {
				      if(this.right)
				      {
				        this.x+= this.speed;
				      }
				    }};
				jet.prototype.drawbullets = function(){
				  for(var i=0;i<this.bulletsr.length;i++)
				  {
				    if(this.bulletsr[i].y>=0) this.bulletsr[i].draw();
				    if(this.bulletsr[i].explode.hit) this.bulletsr[i].explode.draw();
				  }
				  for(var i=0;i<this.bulletsl.length;i++)
				  {
				    if(this.bulletsl[i].y>=0) this.bulletsl[i].draw();
				    if(this.bulletsl[i].explode.hit) this.bulletsl[i].explode.draw();
				  }};
				jet.prototype.checkshoot = function(){
				  if(this.shoot && !this.startshoot)
				  {
				      this.startshoot = true;
				      this.bulletsr[this.currentshot].fire(this.bulletsrx,this.bulletsry);
				      this.bulletsl[this.currentshot].fire(this.bulletslx,this.bulletsly);
				      this.currentshot++;
				      if(this.currentshot >= this.bulletsr.length) this.currentshot = 0;
				      if(this.currentshot >= this.bulletsl.length) this.currentshot = 0;
				  }
				  else if(!this.shoot)
				  {
				      this.startshoot = false;
				  }};
				jet.prototype.collision = function(){
				  for(var i=0;i<enemies.length;i++){

				    if(this.x+this.width>= enemies[i].x && this.x<= enemies[i].x+ enemies[i].gwidth && 
				      this.y+this.height>= enemies[i].y && this.y <= enemies[i].y + enemies[i].gheight)
				    {
				      this.collided = true;
				      this.destroy(); 
				    }
				    
				  }

				  for(var i=0;i<benemies.length;i++){
				    if(this.x+this.width >= benemies[i].x && this.x<= benemies[i].x+ benemies[i].gwidth && 
				      this.y+this.height>= benemies[i].y && this.y <= benemies[i].y + benemies[i].gheight)
				    {
				      this.collided = true;
				      this.destroy();
				    }
				    
				  }
				  if(this.x+this.width >= boss.x && this.x<= boss.x+ boss.bwidth && 
				      this.y+this.height>= boss.y && this.y <= boss.y + boss.bheight)
				  {
				    this.collided = true;
				    this.destroy();
				  }
				  if(this.x+this.width>=miss.x && this.x<=miss.x+miss.mwidth && this.y+this.height>= miss.y && this.y<=miss.y+miss.mheight)
				  {
				    this.destroy();

				  }
				  else
				  {
				    this.collided = false;
				  }};
				jet.prototype.destroy = function(){
				    if(this.radius<= this.collsucc)
				  	{
				    ctx.drawImage(image,0,1190,18,20,this.x+15,this.y+30-this.radius,18+this.radius,20+this.radius);
				    ctx.drawImage(image,0,1190,18,20,this.x+30-this.radius,this.y+60-this.radius,18+this.radius,20+this.radius);
				    ctx.drawImage(image,0,1190,18,20,this.x+3,this.y+60-this.radius,18+this.radius,20+this.radius);
				    this.left = false;
				    this.right = false;
				    this.down = false;
				    this.up = false;
				    this.radius+=1;
				  	}
				  	if(this.collision>45)
				  	{
				    	for(var i=0;i<enemies.length;i++)
				    	{
				      	enemies[i].erase();
				    	}
				  	}
				  	if(this.radius>=this.collsucc)
				  	{
				    	this.collided = false;
				    	this.x = 130 - 20;
				    	this.y = 320;
				    	this.radius = 10;
				    	this.life -= 1;
				  	}};
				jet.prototype.flip = function(){
				  switch(count)
				  {
				    case 0: if(this.frames<=8)
				        {
				          
				          ctx.drawImage(image,0,1000,50,90,this.x,this.y,50,90);
				          this.frames++;
				        }
				        if(this.frames>=8)
				        {
				          count = 1;
				          this.frames = 5;
				        }
				        
				        break;
				    case 1: if(this.frames<=8)
				        {
				          ctx.drawImage(image,0,1090,50,90,this.x,this.y,50,90);
				          
				          this.frames++;
				        }
				        if(this.frames>=8)
				        {
				          count = 0;
				          this.frames = 5;  
				        }
				        break;
				  	}};
				// Bullet object
				function Bullet(){
				  this.x= -10;
				  this.y= 510;
				  this.srcx = 90;
				  this.srcy = 1000;
				  this.width = 10;
				  this.height = 10;
				  this.explode = new Explode();};
				Bullet.prototype.draw = function(){
				  this.y -= 5;
				  ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.width-8,this.height+5);
				  ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.width-8,this.height);
				  this.targetsucess();
				  if(this.y<= -10) this.recycle(); };
				Bullet.prototype.recycle = function(){
				  this.x=-10;
				};
				Bullet.prototype.fire = function(startx, starty){
				    this.x = startx;
				    this.y = starty;};
				Bullet.prototype.targetsucess = function(){

				  for(var i=0;i<enemies.length;i++)
				  {
				    if(enemies[i].y>=0)
				    {
				      if(this.x >= enemies[i].x && this.x<= enemies[i].x + enemies[i].gwidth &&
				       this.y+20 >= enemies[i].y && this.y+20<= enemies[i].y + enemies[i].gheight
				       )
				    	{
				      		this.explode.x = enemies[i].x +2;
				      		this.explode.y = enemies[i].y +25;
				      		this.explode.hit = true;
				      		enemies[i].erase();
				      		this.recycle(); 
				      		score += 10;
				    	}
				    }
				  }
				  for(var i=0;i<benemies.length;i++)
				  {
				    if(benemies[i].y>=0)
				    {
				      if(this.x >= benemies[i].x && this.x<= benemies[i].x + benemies[i].gwidth &&
				       this.y+20 >= benemies[i].y && this.y+20<= benemies[i].y + benemies[i].gheight
				       )
				    	{
				      this.explode.x = benemies[i].x +2;
				      this.explode.y = benemies[i].y +25;
				      this.explode.hit = true;
				      benemies[i].erase();
				      this.recycle(); 
				      score += 10;
				    	}
				    }
				    
				  }
				  if (boss.y>=0) 
				  {
				    if(this.x >= boss.x && this.x<= boss.x + boss.bwidth &&
				       this.y>= boss.y+30 && this.y<= boss.y + boss.bheight-50
				      )
				  	{
				    	boss.bosshit = true;
				    	boss.collision();
				    	this.recycle();
				  	}
				  	else
				  	{
				    	boss.bosshit = false;
				  	}
				 }};

				function Explode(){
				  this.x = 40;
				  this.y = 310;
				  this.srcx = 60;
				  this.srcy = 1050;
				  this.width = 30;
				  this.height = 30;
				  this.gwidth = 5;
				  this.gheight = 5;
				  this.firstframe = 0;
				  this.totalframe = 25;
				  this.hit = false;}
				Explode.prototype.draw = function(){
				  
				  if(this.firstframe<= this.totalframe)
				  {
				    ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.gwidth+this.firstframe,this.gheight+this.firstframe);
				    this.firstframe++;
				  }
				  else
				  {
				    this.hit = false;
				    this.firstframe = 0;
				  }};
				// big enemy object
				function benemy(){
				  this.x = 10+Math.floor(Math.random()*200);
				  this.y =-100+ Math.floor(Math.random()*30);
				  this.srcx = 100;
				  this.srcy = 1000;
				  this.width = 80;
				  this.height = 90;
				  this.gwidth = 50;
				  this.gheight = 60;}
				benemy.prototype.draw = function(){
				  this.y+=2;
				  ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.gwidth,this.gheight);
				  this.escaped();};
				benemy.prototype.escaped = function(){
				    if(this.y>=2000)
				    {
				      this.erase();
				    }};
				benemy.prototype.erase = function(){
				  benemies.splice(benemies.indexOf(this),1);
				  btot--;};
				//small enemy object
				function enemy(){
				  this.x = 10+Math.floor(Math.random()*200);
				  this.y =-300+ Math.floor(Math.random()*10);
				  this.srcx = 50;
				  this.srcy = 1000;
				  this.width = 40;
				  this.height = 50;
				  this.gwidth = 30;
				  this.gheight = 50;}
				enemy.prototype.draw = function(){
				  if(cross<=25)
				  {
				    this.y += 1.5;  
				    
				  }
				  if(cross>=5)
				  {
				    
				  }
				  if(cross>25 && cross <=50)
				  {
				    this.y += 2.5;
				  }
				  if(cross>50 && cross <=75)
				  {
				    this.y += 3.5;
				    
				  }
				  if(cross>75 && cross <=125)
				  {
				    this.y += 4;
				  }
				  if(cross>125 && cross <=200)
				  {
				    this.y += 4.5;
				  }
				  if(cross>200)
				  {
				    this.y += 2;
				    boss.draw();
				    boss.status(); 
				  }
				  ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.gwidth,this.gheight);
				  this.escaped();};
				enemy.prototype.escaped = function(){
				    if(this.y>=2000)
				    {
				      this.erase();
				    }};
				enemy.prototype.erase = function(){
				  enemies.splice(enemies.indexOf(this),1);
				  tot--;};

				function Boss(){
				  this.x = 20;
				  this.y = -300;
				  this.srcx = 49;
				  this.srcy = 1090;
				  this.width = 210;
				  this.height = 270;
				  this.bwidth = 180;
				  this.bheight = 120;
				  this.moveleft = false;
				  this.moveright = true;
				  this.bosslife = 100;
				  this.bosshit = false;
				  this.startingframes = 0;
				  this.endingframes = 100;}
				Boss.prototype.draw = function() {
				  if(this.y<=0)
				  {
				    this.y+= .2;
				  }
				  this.move();
				  this.collision();
				  ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.bwidth,this.bheight);};
				Boss.prototype.move = function() {
				  if(this.y >0)
				  {
				      miss.draw(boss.x);
				      if(this.moveright)
				      {
				        this.x+=.1;
				      }
				      if(this.x>=90)
				      {
				        this.moveright = false;
				        this.moveleft = true;
				      }
				      if(this.moveleft)
				      {
				        this.x-=.1;
				      }
				      if(this.x<=0)
				      {
				        this.moveleft = false;
				        this.moveright = true; 
				      }
				  }};
				Boss.prototype.collision = function() {
				 if(this.bosshit)
				 {
				  this.bosslife -=.2;
				 } 
				 if(this.bosslife <=0)
				 {
				    this.explosion();
				  }};
				Boss.prototype.status = function() {
				  	if(this.y>=0)
				    {
				    	if(this.bosslife>=85)
				    	{ 
				      		ctx.fillStyle = "rgb(124,252,0)";
				    	}
				    
				    	if(this.bosslife>=65 && this.bosslife<85)
				    	{ 
				      		ctx.fillStyle = "rgb(255,215,0)";
				      	}
				    	if(this.bosslife>=50 && this.bosslife<65)
				    	{
				      		ctx.fillStyle = "rgb(255,255,0)"; 
				    	}

				    	if(this.bosslife>=35 && this.bosslife<50)
				    	{
				      	ctx.fillStyle = "rgb(255,165,0)"; 
				    	}

				    	if(this.bosslife>=15 && this.bosslife<35)
				    	{
				      	ctx.fillStyle = "rgb(255,69,0)"; 
				    	}

				    	ctx.fillRect(this.x+30,10,this.bosslife,5); 
				    }};
				Boss.prototype.explosion = function(first_argument) {
				  this.y = -300;
				  if(this.endingframes>=this.startingframes)
				  {
				    ctx.drawImage(image,0,1190,18,20,40,0,18+this.startingframes,20+this.startingframes);
				    ctx.drawImage(image,0,1190,18,20,120-.5,0,18+this.startingframes,20+this.startingframes);
				    ctx.drawImage(image,0,1190,18,20,90-.5,0,18+this.startingframes,20+this.startingframes);
				    ctx.drawImage(image,0,1190,18,20,60-.5,30,18+this.startingframes,20+this.startingframes);
				    ctx.drawImage(image,0,1190,18,20,60,30,18+this.startingframes,20+this.startingframes);
				    ctx.drawImage(image,0,1190,18,20,100,60,18+this.startingframes,20+this.startingframes);
				    ctx.drawImage(image,0,1190,18,20,140,60,18+this.startingframes,20+this.startingframes);
				    this.startingframes +=.5;
				  }};
				function missile(){
				  this.x;
				  this.y = 0;
				  this.srcx = 90;
				  this.srcy = 1010;
				  this.width = 10;
				  this.height = 25;
				  this.mwidth = 6;
				  this.mheight = 30}
				missile.prototype.draw = function(startx){
				  this.x = 130;
				  this.y+=.5;
				  if(this.y>=500)
				  {
				    this.y = 0;
				  }
				  ctx.drawImage(image,this.srcx,this.srcy,this.width,this.height,this.x,this.y,this.mwidth,this.mheight);
				};
				function keypressed(e){
			  		var key = e.which || e.keyCode;
			  		if(key == 38 || key == 87)
			  		{
			    		e.preventDefault();
			    		player.up = true;
			  		}
			  		if(key == 37 || key == 65)
			  		{
			    		e.preventDefault();
			    		player.left = true;
			  		}
					if(key == 39 || key == 68)
					{
					    e.preventDefault();
					    player.right = true;
					}
					if(key == 40 || key == 83)
					{
					    e.preventDefault();
					    player.down = true;
					}
					if(key == 32)
					{
					    e.preventDefault();
					    player.shoot = true;
					}
					if(key == 27)
					{
					    e.preventDefault();
					    if(keyinplay)
					    {
							    ctr++;
							    if(ctr == 1)
							    {
							      playing = false;
							      enemydrawing = false;
							      backinplay = false;
							      if(!playing)
							      {
							        ctx.drawImage(image,260,1260,260,420,0,0,260,420);
							        window.addEventListener('click',rclick,false);
							      } 
							    }	
					    }
					    
					}}
			    function rclick(e){
			    	

			      var pos = inner.getBoundingClientRect();
			      var posx = e.clientX - pos.left;
			      var posy = e.clientY - pos.top;
			      if(posx>=60 && posx<=200 && posy>=100 && posy<=150)
			      {
			        playing = true;
			        inplay = false;
			        enemydrawing = true;
			        backinplay = true;
			        keyinplay = true;
			        draw();
			        ctr=0;
			        window.removeEventListener('click',rclick,false);
			      }
			      if(posx>=60 && posx<=200 && posy>=180 && posy<=230)
			      {
			        layer = 2;
			        space.hide();
			        backinplay = true;
			        keyinplay = true;
			        menu.show();
			        window.removeEventListener('click',rclick,false);
			        return;
			      }
			  }
			  function keyreleased(e){
  					  var key = e.which || e.keyCode;
					  if(key == 38 || key == 87)
					  {
					    e.preventDefault();
					    player.up = false;
					  }
					  if(key == 37 || key == 65)
					  {
					    e.preventDefault();
					    player.left = false;
					  }
					  if(key == 39 || key == 68)
					  {
					    e.preventDefault();
					    player.right = false;
					  }
					  if(key == 40 || key == 83)
					  {
					    e.preventDefault();
					    player.down = false;
					  }
					  if(key == 32)
					  {
					    e.preventDefault();
					    player.shoot = false;
					  }
					}

	}
		
}