let myCanvas = document.getElementById('myCanvas');
myCanvas.width = 300;
myCanvas.height = 300;

let ctx = myCanvas.getContext('2d');

function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}

let charData = {
    Classic: 10,
    Opera: 20,
    Modern: 30,
}

let Barchart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function () {
        let maxValue = 0;
        for (let categ in this.options.data) {
            maxValue = Math.max(maxValue, this.options.data[categ]);
        }
        let canvasActualHeight = this.canvas.height - this.options.padding * 2;
        let canvasActualWidth = this.canvas.width - this.options.padding * 2;

        let gridValue = 0;
        while (gridValue <= maxValue) {
            let gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );

            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10, gridY - 2);
            this.ctx.restore();

            gridValue += this.options.gridScale;
        }

        let barIndex = 0;
        let numberOfBars = Object.keys(this.options.data).length;
        let barSize = (canvasActualWidth) / numberOfBars;

        for (categ in this.options.data) {
            let val = this.options.data[categ];
            let barHeight = Math.round(canvasActualHeight * val / maxValue);
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex % this.colors.length]
            );

            barIndex++;
        }

    }
};

let myBarchart = new Barchart(
    {
        canvas: myCanvas,
        padding: 10,
        gridScale: 5,
        gridColor: "#eeeeee",
        data: charData,
        colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"]
    }
);

myBarchart.draw();