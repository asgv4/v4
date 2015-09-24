frame = new Object();

frame.init = function()
{
	this.element = document.createElement('div');
	this.element.setAttribute('class','frame');
	document.body.appendChild(this.element);
	
	this.width = 0;
	this.height = 0;
	
	this.reshape = function()
	{
		this.height = document.documentElement.clientHeight;
		this.element.style.height = this.height + 'px';
		
		this.width = document.documentElement.clientWidth - 16;
		// this.width = this.element.offsetWidth;
		// this.element.style.width = this.width + 'px';
		
		if(this.week != undefined)
		{
			this.week.resize(this.width,this.height);
		}
	};
	
	this.week = undefined;
	
	this.add = function(week)
	{
		week.parent = this;
		this.week = week;
		this.element.appendChild(week.element);
	};
	
	this.mark = function(date)
	{
		this.week.mark(date);
	}
};