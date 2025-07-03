/**
 * 1.方便做diff，避免无意义的渲染
 * 2.只拷贝变动的节点，其余部分保持引用不变（结构共享）
 * 3.不会意外地“改坏”原始数据
 * 4.创建新结构 属于V8底层的快对象 性能更好
 */

import { useCallback, useState } from "react";
import { Draft, freeze, produce } from 'immer';

// 这里的 Draft<S> 是 Immer 库中的类型，用于表示可变的草稿状态
export type DraftFunction<S> = (draft: Draft<S>) => void;
// Updater<S> 函数签名 接受一个参数 arg 类型是 S 或者 DraftFunction<S 返回 void
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
// 返回一个元组类型 ImmerHook<S> 包含两个元素
export type ImmerHook<S> = [S, Updater<S>];
// 函数的签名 接受initialValue参数 类型是S 或者 () => S 返回 [state, setState]
export function useImmer<S = unknown>(initialValue: S | (() => S)) : ImmerHook<S>;

export function useImmer<T>(initialValue: T) {
  const [val, updateValue] = useState(
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue, true),
  );

  return [
    val,
    useCallback((updater: T | DraftFunction<T>) => {
      if (typeof updater === 'function') {
        updateValue(produce(updater as DraftFunction<T>));
      } else {
        updateValue(freeze(updater));
      }
    }, [])
  ];
}

// const [state, setState] = useImmer({a:123});

// setState((draft) => {
//   draft.a = 456;
// })

// setState1 = (updater: T | DraftFunction<T>) => {
//   if (typeof updater === 'function') {
//     updateValue(produce(updater as DraftFunction<T>));
//   } else {
//     updateValue(freeze(updater));
//   }
// }