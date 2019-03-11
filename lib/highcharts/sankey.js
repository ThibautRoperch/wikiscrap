// https://code.highcharts.com/modules/sankey.js

/*
  Highcharts JS v7.0.3 (2019-02-06)
 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(k){"object"===typeof module&&module.exports?(k["default"]=k,module.exports=k):"function"===typeof define&&define.amd?define(function(){return k}):k("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(k){(function(g){g.NodesMixin={createNode:function(k){function l(b,c){return g.find(b,function(a){return a.id===c})}var e=l(this.nodes,k),t=this.pointClass,b;e||(b=this.options.nodes&&l(this.options.nodes,k),e=(new t).init(this,g.extend({className:"highcharts-node",isNode:!0,id:k,y:1},
b)),e.linksTo=[],e.linksFrom=[],e.formatPrefix="node",e.name=e.name||e.options.id,e.getSum=function(){var b=0,c=0;e.linksTo.forEach(function(a){b+=a.weight});e.linksFrom.forEach(function(a){c+=a.weight});return Math.max(b,c)},e.offset=function(b,c){for(var a=0,d=0;d<e[c].length;d++){if(e[c][d]===b)return a;a+=e[c][d].weight}},e.hasShape=function(){var b=0;e.linksTo.forEach(function(c){c.outgoing&&b++});return!e.linksTo.length||b!==e.linksTo.length},this.nodes.push(e));return e}}})(k);(function(g){var k=
g.defined,l=g.seriesType,e=g.pick,t=g.Point;l("sankey","column",{colorByPoint:!0,curveFactor:.33,dataLabels:{enabled:!0,backgroundColor:"none",crop:!1,nodeFormat:void 0,nodeFormatter:function(){return this.point.name},format:void 0,formatter:function(){return""},inside:!0},linkOpacity:.5,nodeWidth:20,nodePadding:10,showInLegend:!1,states:{hover:{linkOpacity:1}},tooltip:{followPointer:!0,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"{point.fromNode.name} \u2192 {point.toNode.name}: \x3cb\x3e{point.weight}\x3c/b\x3e\x3cbr/\x3e",
nodeFormat:"{point.name}: \x3cb\x3e{point.sum}\x3c/b\x3e\x3cbr/\x3e"}},{isCartesian:!1,forceDL:!0,orderNodes:!0,createNode:g.NodesMixin.createNode,getNodePadding:function(){return this.options.nodePadding},createNodeColumn:function(){var b=this.chart,d=[],c=this.getNodePadding();d.sum=function(){var a=0;this.forEach(function(b){a+=b.getSum()});return a};d.offset=function(a,b){for(var f=0,h=0;h<d.length;h++){if(d[h]===a)return f+(a.options.offset||0);f+=d[h].getSum()*b+c}};d.top=function(a){for(var h=
0,f=0;f<d.length;f++)0<f&&(h+=c),h+=d[f].getSum()*a;return(b.plotSizeY-h)/2};return d},createNodeColumns:function(){var b=[];this.nodes.forEach(function(c){var a=-1,d,f;if(!g.defined(c.options.column))if(0===c.linksTo.length)c.column=0;else{for(d=0;d<c.linksTo.length;d++)f=c.linksTo[0],f.fromNode.column>a&&(a=f.fromNode.column);c.column=a+1}b[c.column]||(b[c.column]=this.createNodeColumn());b[c.column].push(c)},this);for(var d=0;d<b.length;d++)void 0===b[d]&&(b[d]=this.createNodeColumn());return b},
pointAttribs:function(b,d){var c=this.options.linkOpacity,a=b.color;d&&(c=this.options.states[d].linkOpacity||c,a=this.options.states[d].color||b.color);return{fill:b.isNode?a:g.color(a).setOpacity(c).get()}},generatePoints:function(){function b(a,c){void 0===a.level&&(a.level=c,a.linksFrom.forEach(function(a){b(a.toNode,c+1)}))}var d={},c=this.chart;g.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=0;this.nodes.forEach(function(a){a.linksFrom.length=0;a.linksTo.length=
0;a.level=void 0});this.points.forEach(function(a){k(a.from)&&(d[a.from]||(d[a.from]=this.createNode(a.from)),d[a.from].linksFrom.push(a),a.fromNode=d[a.from],c.styledMode?a.colorIndex=e(a.options.colorIndex,d[a.from].colorIndex):a.color=a.options.color||d[a.from].color);k(a.to)&&(d[a.to]||(d[a.to]=this.createNode(a.to)),d[a.to].linksTo.push(a),a.toNode=d[a.to]);a.name=a.name||a.options.id},this);this.orderNodes&&(this.nodes.filter(function(a){return 0===a.linksTo.length}).forEach(function(a){b(a,
0)}),g.stableSort(this.nodes,function(a,b){return a.level-b.level}))},setData:function(){this.nodes&&(this.nodes.forEach(function(b){b.destroy()}),this.nodes.length=0);g.Series.prototype.setData.apply(this,arguments)},translateNode:function(b,d){var c=this.translationFactor,a=this.chart,h=b.getSum(),f=h*c;d=d.top(c)+d.offset(b,c);var c=this.colDistance*b.column,c=a.inverted?a.plotSizeX-c:c,e=this.options.nodeWidth;b.sum=h;b.shapeType="rect";b.nodeX=c;b.nodeY=d;b.shapeArgs=a.inverted?{x:c-e,y:a.plotSizeY-
d-f,width:e,height:f}:{x:c,y:d,width:e,height:f};b.shapeArgs.display=b.hasShape()?"":"none";b.plotY=1},translateLink:function(b){var d=b.fromNode,c=b.toNode,a=this.chart,h=this.translationFactor,f=b.weight*h,e=this.options,g=d.offset(b,"linksFrom")*h,k=(a.inverted?-this.colDistance:this.colDistance)*e.curveFactor,g=d.nodeY+g,m=d.nodeX,h=this.nodeColumns[c.column].top(h)+c.offset(b,"linksTo")*h+this.nodeColumns[c.column].offset(c,h),e=e.nodeWidth,c=c.column*this.colDistance,n=b.outgoing,p=c>m;a.inverted&&
(g=a.plotSizeY-g,h=a.plotSizeY-h,c=a.plotSizeX-c,e=-e,f=-f,p=m>c);b.shapeType="path";b.linkBase=[g,g+f,h,h+f];if(p)b.shapeArgs={d:["M",m+e,g,"C",m+e+k,g,c-k,h,c,h,"L",c+(n?e:0),h+f/2,"L",c,h+f,"C",c-k,h+f,m+e+k,g+f,m+e,g+f,"z"]};else{var k=c-20-f,n=c-20,p=c,u=m+e,r=u+20,l=r+f,t=g,v=g+f,y=v+20,a=y+(a.plotHeight-g-f),q=a+20,x=q+f,z=h,w=z+f,A=w+20,B=q+.7*f,C=p-.7*f,D=u+.7*f;b.shapeArgs={d:["M",u,t,"C",D,t,l,v-.7*f,l,y,"L",l,a,"C",l,B,D,x,u,x,"L",p,x,"C",C,x,k,B,k,a,"L",k,A,"C",k,w-.7*f,C,z,p,z,"L",p,
w,"C",n,w,n,w,n,A,"L",n,a,"C",n,q,n,q,p,q,"L",u,q,"C",r,q,r,q,r,a,"L",r,y,"C",r,v,r,v,u,v,"z"]}}b.dlBox={x:m+(c-m+e)/2,y:g+(h-g)/2,height:f,width:0};b.y=b.plotY=1;b.color||(b.color=d.color)},translate:function(){this.processedXData||this.processData();this.generatePoints();this.nodeColumns=this.createNodeColumns();var b=this,d=this.chart,c=this.options.nodeWidth,a=this.nodeColumns,e=this.getNodePadding();this.translationFactor=a.reduce(function(a,b){return Math.min(a,(d.plotSizeY-(b.length-1)*e)/
b.sum())},Infinity);this.colDistance=(d.plotSizeX-c)/(a.length-1);a.forEach(function(a){a.forEach(function(c){b.translateNode(c,a)})},this);this.nodes.forEach(function(a){a.linksFrom.forEach(function(a){b.translateLink(a)})})},render:function(){var b=this.points;this.points=this.points.concat(this.nodes);g.seriesTypes.column.prototype.render.call(this);this.points=b},animate:g.Series.prototype.animate,destroy:function(){this.data=[].concat(this.points,this.nodes);g.Series.prototype.destroy.call(this)}},
{getClassName:function(){return(this.isNode?"highcharts-node ":"highcharts-link ")+t.prototype.getClassName.call(this)},isValid:function(){return this.isNode||"number"===typeof this.weight}})})(k)});
//# sourceMappingURL=sankey.js.map