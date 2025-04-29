import { autorun } from "mobx";
import { EffectCallback, useEffect } from "react";

export const useMobxEffect = (effect: EffectCallback, dependencies: any[]) => {
  useEffect(() => {
    autorun(effect);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
