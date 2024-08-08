function throttle(func, wait, options = null) {
  let timeout, context, args;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };

  return throttled;
}

function uniqueKey() {
  let uuid = "",
    i,
    random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

function getRandColorRange(minColor = 0, maxColor = 255) {
  if (minColor > maxColor) {
    minColor = 0;
    maxColor = 255;
  }
  maxColor++;
  let r = Math.floor(Math.random() * (maxColor - minColor) + minColor);
  let g = Math.floor(Math.random() * (maxColor - minColor) + minColor);
  let b = Math.floor(Math.random() * (maxColor - minColor) + minColor);
  return {
    cS: `rgba(${r},${g},${b},255)`,
    r,
    g,
    b,
  };
}

function getRandNumber(min = 0, max = 255) {
  return Math.floor(Math.random() * (max - min) + min);
}

class GrainExplode {
  constructor(id) {
    this.lastRenderTime = new Date().getTime();
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;

    this.mouseIsDown = false;

    this.canvas = document.getElementById(id);

    this.cw = document.body.offsetWidth;
    this.ch = document.body.offsetHeight;
    this.canvas.width = this.cw;
    this.canvas.height = this.ch;

    this.canvas.addEventListener("click", this.canvasClickHandler.bind(this));

    this.canvas.addEventListener("mousedown", () => {
      this.mouseIsDown = true;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.mouseIsDown = false;
    });

    const mousemoveHandler = throttle(this.canvasMousemoveHandler, 50, {
      leading: true,
      trailing: false,
    });
    this.canvas.addEventListener("mousemove", mousemoveHandler.bind(this));

    this.$ = this.canvas.getContext("2d");

    this.canvasData();

    this.createRandomPoint();

    // this.createPoint(100, 100)

    this.render();
  }

  canvasData() {
    this.cRandInterval = 2000;
    this.tPointColor = "#F5FFC9";
    this.tPointZoom = 0.05;
    this.tPointR = 7;
    this.point = [];

    this.lines = [];

    this.explodeRang = 100;
    this.explodeCRang = 80;
    this.explode = [];

    this.bCenterPos = {
      x: this.cw / 2,
      y: this.ch,
    };
  }

  canvasClickHandler({ x, y }) {
    this.createPoint(x, y);
  }

  canvasMousemoveHandler({ x, y }) {
    if (this.mouseIsDown) {
      this.createPoint(x, y);
    }
  }

  createRandomPoint() {
    this.cRandTimer = setInterval(() => {
      let maxX = Math.floor(Math.random() * this.cw);
      let maxY = Math.floor(Math.random() * (this.ch - 150 - 20) + 20);
      this.createPoint(maxX, maxY);
    }, this.cRandInterval);
  }

  createPoint(x, y) {
    const color = getRandColorRange(100);
    const point = {
      id: uniqueKey(),
      x,
      y,
      destroy: false,
      r: this.tPointR - 3,
      color: color.cS,
      colorInfo: color,
      zoom: this.tPointZoom,
    };

    this.point.push(point);

    this.createMoveLine(point);
  }

  destroyPoint(id) {
    for (let i = 0, len = this.point.length; i < len; i++) {
      if (this.point[i].id === id) {
        this.point[i].destroy = true;
        return;
      }
    }
  }

  fillTargetRound(points) {
    for (let i = 0, len = points.length; i < len; i++) {
      this.$.strokeStyle = points[i].color;
      this.$.lineWidth = 2;
      this.$.beginPath();
      this.$.arc(points[i].x, points[i].y, points[i].r, 0, 2 * Math.PI);
      this.$.stroke();
    }
  }

  directionLines() {
    this.$.lineCap = "round";
    for (let i = 0, len = this.lines.length; i < len; i++) {
      let l = this.lines[i];

      const long = this.getTwoPointSpacing(l.endX, l.endY, l.nextX, l.nextY);

      const nP = this.findEndpoint(
        l.targetX,
        l.targetY,
        l.currentX,
        l.currentY,
        l.cD
      );

      const aCd = Math.abs(l.cD);
      if (l.d > aCd + 5) {
        l.cD -= 10 * (aCd / l.d) + 1;
      } else {
        this.destroyPoint(l.pId);
        l.destroy = true;
        this.createExplode(l.targetX, l.targetY);
      }

      l.nextX = nP.x;
      l.nextY = nP.y;

      if (long > l.long) {
        const eP = this.findEndpoint(
          l.targetX,
          l.targetY,
          l.currentX,
          l.currentY,
          l.cD + l.long + 1
        );
        l.endX = eP.x;
        l.endY = eP.y;
      }

      this.$.strokeStyle = this.createLineColor(l);
      this.$.lineWidth = 4;

      this.$.beginPath();

      this.$.moveTo(l.endX, l.endY);

      this.$.lineTo(l.nextX, l.nextY);

      this.$.stroke();
    }
  }

  createLineColor(line) {
    const gradient = this.$.createLinearGradient(
      line.endX,
      line.endY,
      line.nextX,
      line.nextY
    );
    gradient.addColorStop(
      0,
      `rgba(${line.color.r},${line.color.g},${line.color.b},0)`
    );
    gradient.addColorStop(
      0.5,
      `rgba(${line.color.r},${line.color.g},${line.color.b},0.3)`
    );
    gradient.addColorStop(
      1,
      `rgba(${line.color.r},${line.color.g},${line.color.b},1)`
    );

    return gradient;
  }

  createMoveLine(point) {
    const d = this.getTwoPointSpacing(
      this.bCenterPos.x,
      this.bCenterPos.y,
      point.x,
      point.y
    );
    this.lines.push({
      pId: point.id,
      destroy: false,
      targetX: point.x,
      targetY: point.y,
      nextX: this.bCenterPos.x,
      nextY: this.bCenterPos.y,
      endX: this.bCenterPos.x,
      endY: this.bCenterPos.y,
      currentX: this.bCenterPos.x,
      currentY: this.bCenterPos.y,
      d,
      cD: 0,
      color: point.colorInfo,
      long: Math.floor(Math.random() * (70 - 45) + 45),
    });
  }

  createExplode(x, y) {
    const num = getRandNumber(10, 20);
    const explode = [];
    for (let i = 0; i < num; i++) {
      const e = {
        path: [],
      };
      let endX = getRandNumber(x - this.explodeRang, x + this.explodeRang);
      let endY = getRandNumber(y - this.explodeRang, y + this.explodeRang);

      let cP1x = getRandNumber(x - this.explodeCRang, x + this.explodeCRang);
      let cP1y = getRandNumber(y - this.explodeCRang, y + this.explodeCRang);

      let cP2x = getRandNumber(x - this.explodeCRang, x + this.explodeCRang);
      let cP2y = getRandNumber(y - this.explodeCRang, y + this.explodeCRang);

      for (let t = 0; t <= 1; t += 0.01) {
        const point = this.getCubicBezierPoint(
          x,
          y,
          cP1x,
          cP1y,
          cP2x,
          cP2y,
          endX,
          endY,
          t
        );
        e.path.push(point);
      }

      e.color = getRandColorRange(100);
      e.size = getRandNumber(3, 8);
      e.destroy = false;

      explode.push(e);
    }
    this.explode.push(...explode);
  }

  drawExplode() {
    for (let i = 0, len = this.explode.length; i < len; i++) {
      const p = this.explode[i];

      let ppLen = p.path.length;
      if (ppLen) {
        this.$.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${
          ppLen / 100
        })`;
        this.$.beginPath();
        this.$.arc(p.path[0].x, p.path[0].y, p.size, 0, 2 * Math.PI);
        this.$.fill();

        p.path.shift();
      } else {
        p.destroy = true;
      }
    }
  }

  getCubicBezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const cx = 3 * (x1 - x0);
    const cy = 3 * (y1 - y0);
    const bx = 3 * (x2 - x1) - cx;
    const by = 3 * (y2 - y1) - cy;
    const ax = x3 - x0 - cx - bx;
    const ay = y3 - y0 - cy - by;
    const x = ax * t * t * t + bx * t * t + cx * t + x0;
    const y = ay * t * t * t + by * t * t + cy * t + y0;
    return { x, y };
  }

  getTwoPointSpacing(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  }
  getLinesY(x1, y1, x2, y2, a) {
    let k = (y2 - y1) / (x2 - x1);

    return (a - y1) / k + x1;
  }

  // 输入参数：点1的坐标(x1, y1)，点2的坐标(x2, y2)，目标点到点1的距离d
  findEndpoint(x1, y1, x2, y2, d) {
    // 计算向量v的长度
    const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    // 计算归一化向量u
    const u = [(x2 - x1) / len, (y2 - y1) / len];
    // 计算目标点的坐标
    const x = Math.abs(x2 + u[0] * d);
    const y = Math.abs(y2 + u[1] * d);
    return { x, y };
  }

  render() {
    window.requestAnimationFrame(this.render.bind(this));

    let renderTime = new Date().getTime();
    let elapsed = renderTime - this.lastRenderTime;

    if (elapsed > this.fpsInterval) {
      this.lastRenderTime = renderTime - (elapsed % this.fpsInterval);

      this.$.clearRect(0, 0, this.cw, this.ch);

      this.point = this.point.filter((v) => {
        if (!v.destroy) {
          if (Math.floor(v.r) === this.tPointR + 1) {
            v.zoom = -v.zoom;
          }
          if (Math.floor(v.r) === this.tPointR - 3) {
            v.zoom = Math.abs(v.zoom);
          }
          v.r += v.zoom;
          return true;
        }
        return false;
      });

      this.fillTargetRound(this.point);

      this.lines = this.lines.filter((v) => !v.destroy);
      this.directionLines();

      this.explode = this.explode.filter((v) => !v.destroy);
      this.drawExplode();
    }
  }
}

new GrainExplode("myCanvas");
