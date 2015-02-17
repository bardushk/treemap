function Rectangle(name, area, backColor){	
	var _name = name, _left, _top, _width, _height, _backColor = backColor, _area = area;

	function toPercent(value){
		return value * 100 + '%';
	}	
	
	return {
		SetHeight:  function(height){
			if(!height) return;
			_height = height;
			_width = _area / height;
		},

		SetWidth:  function(width){
			if(!width) return;
			_width = width;
			_height = _area / width;
		},
		
		SetPosition: function(left, top){
			_left = left;
			_top = top;			
		},
		
		GetArea: function(){
			return _area;
		},
		
		GetAspectRatio: function(){
			return Math.abs(1 - (_width > _height ? _height / _width : _width / _height));
		},
		
		Render: function(parent){
			if(!parent) return;
			var newRectangle = document.createElement('div');
			newRectangle.className = 'rectangle';
			newRectangle.innerText = _name;
			var style = newRectangle.style;
			style.position = 'absolute';
			style.left = toPercent(_left);
			style.top = toPercent(_top);
			style.width = toPercent(_width);
			style.height = toPercent(_height);
			style.backgroundColor = _backColor;
			parent.appendChild(newRectangle);
		}
	}
}

function TreeMap(){
	var _rectanglesList = [],
		_colorMap = ["#cd0000", "#990000", "#660000", "#330000", "#160000"],
		_currentColorIndex = 0;		
		
	function getNextColor(){
		var color = _colorMap[_currentColorIndex];
		_currentColorIndex++;
		if(_currentColorIndex >= _colorMap.length) {
			_currentColorIndex = 0;
		}
		return color;
	}
	
	function getAspectRatio(width, height){
			return Math.abs(1 - (width > height ? height / width : width / height));
		}
	
	function addVertical(startIndex, h, s, s1, aspect, index){
		if(startIndex >= _rectanglesList.length) return;
		var s = _rectanglesList[startIndex];
		var w = s / h;
		var a = getAspectRatio(w, h); 		
		var aspectModified = getAspectRatio(h, )
		if()
		
		
		
	}
	
	return {
		GenerateTreeMap: function(values){
			_rectanglesList = [];
			values.sort(function(a, b){
				if(a.value < b.value) {
					return 1;
				}
				if(a.value > b.value){
					return -1;
				}
				return 0;
			});
			
			var index, total =0;
			for(index = 0; index < values.length; index++){
				total += values[index].value;
			}
			
			for(index = 0; index < values.length; index++){
				values[index].value /= total;
			}	
			
			for(index = 0; index < values.length; index++){
				_rectanglesList[index] = new Rectangle( values[index].name, values[index].value, getNextColor() );
			}	
			
			var left = 0, top=0, width=1, height = 1;
			
			// 1. Устанавливаем первый прямоугольник
			var index = 0;
			
			while(){
				
				
			}
			var current = _rectanglesList[index] = new Rectangle( values[index].name, values[index].value, getNextColor() );
			current.SetHeight(height);
			current.SetPosition(left, top);
			
			
			/*
			do{
				
				
			}while(false);
				
			var s = values[index].value, currentWidth = s / height, currentHeight = height,
				current = _rectanglesList[index] = new Rectangle(values[index].name, values[index].value, getNextColor() );
				aspect =  getAspectRatio(currentHeight, currentWidth);			
				
			// 2. Добавляем второй прямоугольник
			var next = _rectanglesList[index+1] = new Rectangle(values[index+1].name, values[index + 1].value);
			var s2 = values[index + 1].value,
				widthModified = (s + s2) / height,
				heightModified = s / widthModified,
				aspectModified =  getAspectRatio( widthModified, heightModified );
			// 3. Проверяем,стало ли лучше
			if(aspectModified < aspect){
				// 4. Добавляем в этот-же ряд
				s2 += values[index + 2].value;					
				widthModified = (s + s2) / height;
				heightModified = s / widthModified;
				aspectModified =  getAspectRatio( widthModified, heightModified );
				if(aspectModified < aspect){
						
						
				}	
				else{
						_rectanglesList.push(new Rectangle(values[index].name, values[index].value));
				}	
			}
			else{
				// 5. Добавляем в новый ряд
				_rectanglesList.push(new Rectangle(values[index].name, values[index].value, getNextColor()));
				left += rectWidth;
				width -= rectWidth;				
				index++;
				s = values[index].value;
				rectWidth = width;
				rectHeight = s / rectWidth;				
				aspect1 = getAspectRation(rectWidth, rectHeight);
				// 6. Добавляем в этот-же ряд
				s2 = values[index + 1].value + values[index + 2].value;
				heightModified = (s + s2) / width;
				aspectModified = getAspectRation( widthModified, heightModified );		
				
				if(aspectModified < aspect){
					// 6. Добавляем в этот-же ряд
					s2 = values[index + 1].value + values[index + 2].value;
					heightModified = (s + s2) / width;
					aspectModified = getAspectRation( widthModified, heightModified );												
				}
				else{
					_rectanglesList.push(new Rectangle(values[index].name, left, top, rectWidth, rectHeight, getNextColor()));	
					
				}
			}
			*/
		},
	
		Render: function(parent){
			for(var index in _rectanglesList){
				var rectangle = _rectanglesList[index];
				rectangle.Render(parent);
			}			
		}
	}
}

window.addEventListener('load', function(s,e){
	var treeMap = new TreeMap();
	treeMap.GenerateTreeMap([
		{name: 'r1', value: 10}, 
		{name: 'r2', value: 30}, 
		{name: 'r3', value: 15}, 
		{name: 'r4', value: 17.3}, 
		{name: 'r5', value: 1}, 
		]);
	var parent = document.getElementById('treeMap');
	treeMap.Render(parent);
});


