export class MyMath {
  static median(array: number[]): number {
    array.sort((a, b) => {
      return a - b;
    });
    const mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
  }

  static sum(array: number[]): number {
    let num = 0;
    for (let i = 0, l = array.length; i < l; i++) {
      num += array[i];
    }
    return num;
  }

  static mean(array: number[]): number {
    return this.sum(array) / array.length;
  }

  static meanSample(array: number[]): number {
    return this.sum(array) / (array.length - 1);
  }

  static variance(array: number[]): number {
    const mean = this.mean(array);
    return this.mean(array.map((num) => {
      return Math.pow(num - mean, 2);
    }));
  }

  static varianceSample(array: number[]): number {
    const mean = this.mean(array);
    return this.meanSample(array.map((num) => {
      return Math.pow(num - mean, 2);
    }));
  }

  static randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static standardDeviation(array: number[]): number {
    return Math.sqrt(MyMath.variance(array));
  }

  static standardDeviationSample(array: number[]): number {
    return Math.sqrt(MyMath.varianceSample(array));
  }

  static meanAbsoluteDeviation(array: number[]): number {
    const mean = MyMath.mean(array);
    return MyMath.mean(array.map((num) => {
      return Math.abs(num - mean);
    }));
  }

  static zScores(array: number[]): number[] {
    const mean = MyMath.mean(array);
    const standardDeviation = MyMath.standardDeviation(array);
    return array.map((num) => {
      return (num - mean) / standardDeviation;
    });
  }

  static normalDistribution(value: number, mean: number, standardDeviation: number): number {
    let nv = 1.0 / (Math.sqrt(2.0 * Math.PI) * standardDeviation);
    const z = (value - mean) / standardDeviation;
    nv *= Math.exp(-0.5 * z * z);
    return nv;
  }


  static chiSquareFromTable(degreeOfFreedom: number, probability: number): number {

    const probabilities = [0.995, 0.975, 0.20, 0.10, 0.05, 0.025, 0.02, 0.01, 0.005, 0.002, 0.001];
    const indexOfProbability = probabilities.lastIndexOf(probability);

    const table = new Map<number, number[]>();
    table.set(1, [0.0000393, 0.000982, 1.642, 2.706, 3.841, 5.024, 5.41, 6.635, 7.879, 9.550, 10.828]);
    table.set(2, [0.0100, 0.0506, 3.219, 4.605, 5.991, 7.378, 7.824, 9.210, 10.597, 12.429, 13.816]);
    table.set(3, [0.0717, 0.216, 4.642, 6.251, 7.815, 9.348, 9.837, 11.345, 12.838, 14.796, 16.266]);
    table.set(4, [0.207, 0.484, 5.989, 7.779, 9.488, 11.143, 11.668, 13.277, 14.860, 16.924, 18.467]);
    table.set(5, [0.412, 0.831, 7.289, 9.236, 11.070, 12.833, 13.388, 15.086, 16.750, 18.907, 20.515]);
    table.set(6, [0.676, 1.237, 8.558, 10.645, 12.592, 14.449, 15.033, 16.812, 18.548, 20.791, 22.458]);
    table.set(7, [0.989, 1.690, 9.803, 12.017, 14.067, 16.013, 16.622, 18.475, 20.278, 22.601, 24.322]);
    table.set(8, [1.344, 2.180, 11.030, 13.362, 15.507, 17.535, 18.168, 20.090, 21.955, 24.352, 26.124]);
    table.set(9, [1.735, 2.700, 12.242, 14.684, 16.919, 19.023, 19.679, 21.666, 23.589, 26.056, 27.877]);
    table.set(10, [2.156, 3.247, 13.442, 15.987, 18.307, 20.483, 21.161, 23.209, 25.188, 27.722, 29.588]);

    const arr = table.get(degreeOfFreedom);
    const chi = arr[indexOfProbability];
    return chi;

  }

  static factorial(x: number): number {
    let val = 1;
    for (let i = 2; i <= x; i++) {
      val = val * i;
    }
    return val;
  }

  static probabilityDistribution(mean: number, x: number): number {
    const r1 = Math.pow(Math.E, (mean * -1));
    const r2 = Math.pow(mean, x);
    const r3 = MyMath.factorial(x);
    const result = r1 * r2 / r3;
    return result;
  }

  static chiSquare(r: number, groupCounts: number[], groupProbabilities: number[]): number {
    let sum = 0;
    const total = groupCounts.reduce((a, b) => a + b);
    for (let i = 0; i < r; i++) {
      const v1 = groupCounts[i] - total * groupProbabilities[i];
      const v2 = Math.pow(v1, 2);
      const v3 = total * groupProbabilities[i];
      const value = v2 / v3;
      sum += value;
    }
    return sum;
  }

}
