var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.runSpring=runSpring;exports.runTiming=runTiming;exports.onScroll=exports.translateZ=exports.interpolateColors=exports.lookup=exports.getSnapPoint=exports.atan2=exports.atan=exports.max=exports.min=exports.toDeg=exports.toRad=exports.add=exports.clockRunning=exports.timing=void 0;var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _reactNativeReanimated=_interopRequireDefault(require("react-native-reanimated"));var event=_reactNativeReanimated.default.event,spring=_reactNativeReanimated.default.spring,cond=_reactNativeReanimated.default.cond,set=_reactNativeReanimated.default.set,clockRunning=_reactNativeReanimated.default.clockRunning,startClock=_reactNativeReanimated.default.startClock,stopClock=_reactNativeReanimated.default.stopClock,Value=_reactNativeReanimated.default.Value,add=_reactNativeReanimated.default.add,multiply=_reactNativeReanimated.default.multiply,lessThan=_reactNativeReanimated.default.lessThan,abs=_reactNativeReanimated.default.abs,modulo=_reactNativeReanimated.default.modulo,round=_reactNativeReanimated.default.round,interpolate=_reactNativeReanimated.default.interpolate,divide=_reactNativeReanimated.default.divide,sub=_reactNativeReanimated.default.sub,color=_reactNativeReanimated.default.color,eq=_reactNativeReanimated.default.eq,Extrapolate=_reactNativeReanimated.default.Extrapolate,block=_reactNativeReanimated.default.block,debug=_reactNativeReanimated.default.debug,min2=_reactNativeReanimated.default.min,max2=_reactNativeReanimated.default.max,timing=_reactNativeReanimated.default.timing,Clock=_reactNativeReanimated.default.Clock,greaterOrEq=_reactNativeReanimated.default.greaterOrEq,Node=_reactNativeReanimated.default.Node;exports.timing=timing;exports.add=add;exports.clockRunning=clockRunning;var toRad=function toRad(deg){return multiply(deg,Math.PI/180);};exports.toRad=toRad;var toDeg=function toDeg(rad){return multiply(rad,180/Math.PI);};exports.toDeg=toDeg;var min=function min(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return args.reduce(function(acc,arg){return min2(acc,arg);});};exports.min=min;var max=function max(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}return args.reduce(function(acc,arg){return max2(acc,arg);});};exports.max=max;var atan=function atan(x){return sub(multiply(Math.PI/4,x),multiply(multiply(x,sub(abs(x),1)),add(0.2447,multiply(0.0663,abs(x)))));};exports.atan=atan;var atan2=function atan2(y,x){var coeff1=Math.PI/4;var coeff2=3*coeff1;var absY=abs(y);var angle=cond(greaterOrEq(x,0),[sub(coeff1,multiply(coeff1,divide(sub(x,absY),add(x,absY))))],[sub(coeff2,multiply(coeff1,divide(add(x,absY),sub(absY,x))))]);return cond(lessThan(y,0),multiply(angle,-1),angle);};exports.atan2=atan2;var getSnapPoint=function getSnapPoint(value,velocity,points){var point=add(value,multiply(0.2,velocity));var diffPoint=function diffPoint(p){return abs(sub(point,p));};var deltas=points.map(function(p){return diffPoint(p);});var minDelta=min.apply(void 0,(0,_toConsumableArray2.default)(deltas));return points.reduce(function(acc,p){return cond(eq(diffPoint(p),minDelta),p,acc);},new Value());};exports.getSnapPoint=getSnapPoint;var lookup=function lookup(array,index){var notFound=arguments.length>2&&arguments[2]!==undefined?arguments[2]:new Value();return array.reduce(function(acc,v,i){return cond(eq(i,index),v,acc);},notFound);};exports.lookup=lookup;function runSpring(clock,value,dest){var state={finished:new Value(0),velocity:new Value(0),position:new Value(0),time:new Value(0)};var config={toValue:new Value(0),damping:7,mass:1,stiffness:121.6,overshootClamping:false,restSpeedThreshold:0.001,restDisplacementThreshold:0.001};return block([cond(clockRunning(clock),0,[set(state.finished,0),set(state.time,0),set(state.position,value),set(state.velocity,0),set(config.toValue,dest),startClock(clock)]),spring(clock,state,config),cond(state.finished,debug("stop clock",stopClock(clock))),state.position]);}function runTiming(clock,value,config){var state={finished:new Value(0),position:new Value(0),time:new Value(0),frameTime:new Value(0)};return block([cond(clockRunning(clock),0,[set(state.finished,0),set(state.time,0),set(state.position,value),set(state.frameTime,0),startClock(clock)]),timing(clock,state,config),cond(state.finished,debug("stop clock",stopClock(clock))),state.position]);}function match(condsAndResPairs){var offset=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;if(condsAndResPairs.length-offset===1){return condsAndResPairs[offset];}if(condsAndResPairs.length-offset===0){return undefined;}return cond(condsAndResPairs[offset],condsAndResPairs[offset+1],match(condsAndResPairs,offset+2));}function colorHSV(h,s,v){var c=multiply(v,s);var hh=divide(h,60);var x=multiply(c,sub(1,abs(sub(modulo(hh,2),1))));var m=sub(v,c);var colorRGB=function colorRGB(r,g,b){return color(round(multiply(255,add(r,m))),round(multiply(255,add(g,m))),round(multiply(255,add(b,m))));};return match([lessThan(h,60),colorRGB(c,x,0),lessThan(h,120),colorRGB(x,c,0),lessThan(h,180),colorRGB(0,c,x),lessThan(h,240),colorRGB(0,x,c),lessThan(h,300),colorRGB(x,0,c),colorRGB(c,0,x)]);}var rgb2hsv=function rgb2hsv(_ref){var r=_ref.r,g=_ref.g,b=_ref.b;var v=Math.max(r,g,b);var n=v-Math.min(r,g,b);var h=n&&(v===r?(g-b)/n:v===g?2+(b-r)/n:4+(r-g)/n);return{h:60*(h<0?h+6:h),s:v&&n/v,v:v};};var interpolateColors=function interpolateColors(animationValue,inputRange,colors){var colorsAsHSV=colors.map(function(c){return rgb2hsv(c);}).map(function(c){return{h:c.h,s:c.s/100,v:c.v/100};});var h=interpolate(animationValue,{inputRange:inputRange,outputRange:colorsAsHSV.map(function(c){return c.h;}),extrapolate:Extrapolate.CLAMP});var s=interpolate(animationValue,{inputRange:inputRange,outputRange:colorsAsHSV.map(function(c){return c.s;}),extrapolate:Extrapolate.CLAMP});var v=interpolate(animationValue,{inputRange:inputRange,outputRange:colorsAsHSV.map(function(c){return c.v;}),extrapolate:Extrapolate.CLAMP});return colorHSV(h,s,v);};exports.interpolateColors=interpolateColors;var translateZ=function translateZ(perspective,z){return{scale:divide(perspective,sub(perspective,z))};};exports.translateZ=translateZ;var onScroll=function onScroll(contentOffset){return event([{nativeEvent:{contentOffset:contentOffset}}],{useNativeDriver:true});};exports.onScroll=onScroll;