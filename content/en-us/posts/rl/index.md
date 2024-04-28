---
title: '强化学习笔记'
summary: "强化学习笔记"
slug: RL
date: 2024-04-28T13:19:20+08:00
tags:
  - "强化学习"
---

## 马尔科夫决策过程

### 马尔科夫性

定义：系统的下一个状态$s_{t+1}$仅与当前状态$s_t$有关，与之前的状态无关。

### 马尔科夫过程

定义：马尔科夫过程是一个二元组(S, P)，且满足，S是有限状态集合，P是状态转移概率。过程中不存在动作和奖励，考虑动作（策略）和回报的马尔科夫过程称为马尔科夫决策过程。

### 马尔科夫决策过程

定义：马尔科夫决策过程由元组（$S$, $A$, $P$, $R$, $\gamma$）描述，其中：

- $S$为有限的状态集
- $A$为有限的动作集
- $P$为状态转移概率
- $R$为回报函数
- $\gamma$为折扣因子，用于计算累计回报

强化学习的目标是给定⼀个马尔科夫决策过程，寻找最优策略。所谓策略是指状态到动作的映射，策略常⽤符号$\pi$表⽰，它是指给定状态$s$时，动作集上的⼀个分布，即
$$\pi(a \mid s)=p\left[A_t=a \mid S_t=s\right]$$

1. 状态值函数

当智能体采用策略$\pi$时，累积回报（$G$）在状态$s$处的期望值定义为状态值函数：
$$
v_\pi(s)
= E_\pi \left[ G_t \mid S_t=s \right ]
= E_\pi\left[\sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t=s\right]
$$

状态行为值函数：

$$
q_\pi (s, a) = E_\pi \left[\sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t=s, A_t=a \right]
$$

2. 状态值函数与状态行为值函数的贝尔曼方程

\begin{align}
v_\pi(s) &= E_\pi \left[ G_t \mid S_t=s \right ] \\\
&= E_\pi \left [ R_{t+1} + \gamma R_{t+2} + ... \mid S_t = s \right] \nonumber \\\
&= E_\pi \left [ R_{t+1} + \gamma (R_{t+2} + \gamma R_{t+3} + ...) \mid S_t = s \right] \notag \\\
&= E_\pi \left [ R_{t+1} + \gamma G_{t+1} \mid S_t = s \right] \nonumber \\\
&= E_\pi \left [ R_{t+1} + \gamma v_\pi(S_{t+1}) \mid S_t = s \right] \nonumber \\\
\end{align}
其中，
$$
\begin{align}
V(S_t) &= E_{s_t, s_{t+1}, ...} (R(t+1) + \gamma G(S_{t+1})) \\\
&= E_{s_t} (R(t+1) + \gamma E_{s_{t+1}, ...}(G(S_{t+1})))
\nonumber \\\
&= E_{s_t} (R(t+1) + \gamma V(S_{t+1}))
\nonumber \\\
&= E (R(t+1) + \gamma E_{s_{t+1}, ...}(G(S_{t+1}))) \nonumber \\\
\end{align}
$$
