const {
  forkJoin,
  from,
  of,
  combineLatest,
  BehaviorSubject,
  Observable
} = require("rxjs");
const { map, filter, flatMap, mergeMap } = require("rxjs/operators");
const { callResources, initStreamCache, dispatch } = require("./index");
const partner1 = params =>
  new Observable(obs => {
    console.log(
      `==========================called p1 with   ${JSON.stringify(
        params
      )} ======================`
    );
    setTimeout(() => {
      obs.next(` data from partner1   ${JSON.stringify(params)}`);
    }, 3000);
  });

const partner2 = params =>
  new Observable(obs => {
    console.log(
      `==============================called p2 with  ${JSON.stringify(
        params
      )} ======================`
    );
    setTimeout(() => {
      obs.next(` data from partner2  ${JSON.stringify(params)}`);
    }, 10000);
  });

const partner3 = params =>
  new Observable(obs => {
    console.log(
      `==============================called p3 with  ${JSON.stringify(
        params
      )} ======================`
    );
    setTimeout(() => {
      obs.next(` data from partner3  ${JSON.stringify(params)}`);
    }, 5000);
  });

const p10 = dispatch("partner1", partner1(0), 0);

// deplucat call to partner 1 with the params 0
const dp10 = dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
dispatch("partner1", partner1(0), 0);
//other call
const p20 = dispatch("partner2", partner2(0), 0);
const p11 = dispatch("partner1", partner1(1), 1);
const p21 = dispatch("partner2", partner2(1), 1);

const streamCache$ = initStreamCache();
callResources(streamCache$);

const start = Date.now();
p10.subscribe(res => {
  if (res.state === "End") {
    const end = Date.now();
    console.log("after p10 now", (end - start) / 1000, " second");
    console.log("partner1_data", res);
  }
});

p10.subscribe(res => {
  if (res.state === "End") {
    const end = Date.now();
    console.log("after p10 now v2", (end - start) / 1000, " second");
    console.log("partner1_data with 1", res);
  }
});

setTimeout(() => {
  const start = Date.now();
  dp10.subscribe(res => {
    if (res.state === "End") {
      const end = Date.now();
      console.log("after dp10 timeout", (end - start) / 1000, " second");
      console.log("partner1_data", res);
    }
  });
}, 2000);

setTimeout(() => {
  const start = Date.now();
  p11.subscribe(res => {
    if (res.state === "End") {
      const end = Date.now();
      console.log("after p11  timeout", (end - start) / 1000, " second");
      console.log("partner1_data with 1", res);
    }
  });
}, 2000);

setTimeout(() => {
  const start = Date.now();
  p20.subscribe(res => {
    if (res.state === "End") {
      const end = Date.now();
      console.log("after", (end - start) / 1000, " second");
      console.log("partner2_data", res);
    }
  });
}, 2200);

setTimeout(() => {
  const start = Date.now();
  p21.subscribe(res => {
    if (res.state === "End") {
      const end = Date.now();
      console.log("after", (end - start) / 1000, " second");
      console.log("partner2_data", res);
    }
  });
}, 2200);

setTimeout(() => {
  const start = Date.now();
  p10.subscribe(res => {
    if (res.state === "End") {
      const end = Date.now();
      console.log("after", (end - start) / 1000, " second");
      console.log("partner1_data", res);
    }
  });
}, 5000);
