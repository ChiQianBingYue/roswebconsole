
/**
 * @author Raffaello Bonghi - raffaello.bonghi@officinerobotiche.it
 */

var ROSNAV2D = ROSNAV2D || {
	REVISION: '0.0.1'
};

/**
 * 
 */
ROS_NAV2D.init = function(with, height) {
    
    var size = 1.0;
    var old_pose = {x: 0.0, y: 0.0};
    var center = {x: size / 2, y: 0.5};
    var shift = {x: 0.0, y: 0.0};
    var limit = {x: 0.1, y: 0.1};

    // The ROS2D.Viewer is a 2D scene manager with additional ROS
    // functionality.
    var viewer2D = new ROS2D.Viewer({
        divID: 'nav',
        width: with,
        height: height,
        background: '#ddd'
    });
    
    console.log("AAAAAA");
    
    // Subscribes to the robot's OccupancyGrid, which is ROS representation of
    // the map, and renders the map in the scene.
    this.gridClient = new ROS2D.OccupancyGridClient({
        ros: ros.ros,
        continuous: true,
        rootObject: viewer2D.scene
    });
    
    var gridMap = new ROS2D.Grid({
        size: 10,
        cellSize: 0.05
    });
    this.gridClient.rootObject.addChild(gridMap);
    
    var robotMarker = new ROS2D.NavigationArrow({
        size: 12,
        strokeSize: 1,
        fillColor: createjs.Graphics.getRGB(255, 255, 0, 0.66),
        pulse: false
    });
    
    this.gridClient.rootObject.addChild(robotMarker);
    viewer2D.scaleToDimensions(1, 1);
    viewer2D.shift(-ROS_NAV2D.center.x, -ROS_NAV2D.center.y);
    robotMarker.x = 0;
    robotMarker.y = 0;
    robotMarker.scaleX = 0.01;
    robotMarker.scaleY = 0.01;
    robotMarker.rotation = 90;
    robotMarker.visible = true;
}



/*
this.update = function(pose, orientation) {
    robotMarker.x = pose.x;
    robotMarker.y = -pose.y;
    robotMarker.rotation = viewer2D.scene.rosQuaternionToGlobalTheta(orientation);
    if (old_pose.x !== pose.x || old_pose.y !== pose.y) {
        viewer2D.shift( - old_pose.x + pose.x, - old_pose.y + pose.y);
        old_pose = pose;
    }
};
*/