
var options = document.getElementById('options');
var addBtn = document.getElementById('addBtn');
var rotateBtn = document.getElementById('rotate');
var needle = document.getElementById('needle');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var values='';
var angle;

var radius = 150;

var centerPoint = {
  x:canvas.width/2,
  y:canvas.height/2
};

function getValues(){
  values = valuesToArray(options.value.trim());
  angle = Math.PI*2/values.length
}


function valuesToArray(string){
  return string.split('-');
}

function getCoordinate(angle,radius){
  return {
    x:Math.sin(angle)*radius+200,
    y:Math.cos(angle)*radius+200,
  }
}

function drawArc(){
  ctx.beginPath();
  ctx.arc(centerPoint.x,centerPoint.y,radius,0,Math.PI*2,true);
  ctx.closePath();
  ctx.stroke();
}

function drawLine(){
  if(values.length >1){
    for(var i = 0;i<values.length;i++){
      var endPoint = getCoordinate(angle*i,radius);
      ctx.beginPath();
      ctx.moveTo(centerPoint.x,centerPoint.y);
      ctx.lineTo(endPoint.x,endPoint.y);
      ctx.closePath();
      ctx.stroke();
      drawText(angle,i);
    }
  }
}

function drawText(angle,i){
  if(values.length >1){
    ctx.beginPath();
    var textAngle = angle*i+angle/2;
    var textRadius = radius/3*2;
    var textPoint = getCoordinate(textAngle,textRadius);
    ctx.fillText(values[i],textPoint.x,textPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}

ctx.strokeStyle = '#000';
ctx.font="14px 微软雅黑";
ctx.textAlign="center";

rotateBtn.onclick = function(){
  needle.style.transition='none';
  needle.style.transform='scale(0.6) rotate('+0+'deg)';
  setTimeout(function(){
    if(values.length >1){
      needle.style.transition='transform 3s ease-out';
      var rotateAngle = Math.PI*(Math.random()*2+3);
      needle.style.transform='scale(0.6) rotate('+0+'deg)';
      needle.style.transform='scale(0.6) rotate('+rotateAngle*180+'deg)';
    }else{
      alert('不添加选项，还玩啥')
    }
  },300)
}

addBtn.onclick = function () {
  getValues();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawArc();
  drawLine();
};

drawArc();
drawLine();
drawText();