export function getCircularVelocity(theta, angularVelocity, radius) {
  return {
    x_velocity: angularVelocity * -Math.sin(theta) * radius,
    y_velocity: angularVelocity * Math.cos(theta) * radius,
  };
}

export function getThetaFromPosition(x, y) {
  const theta = Math.atan2(y, x);
  return theta;
}

export function getUnitPositionFromTheta(theta) {
  const x = Math.cos(theta);
  const y = Math.sin(theta);
  return { x, y };
}

export function getCentripetalAccelerationFromVelocity(velocity, radius) {
  return Math.pow(velocity, 2) / radius;
}

export function getVelocityFromAngularVelocity(angularVelocity, radius) {
  return angularVelocity * radius;
}

export function getCentripetalAccelerationComponents(a, theta) {
  const horizon = 2 * Math.PI + (theta - Math.PI);
  const y_accel = -1 * a * Math.sin(theta);
  const x_accel = 1 * a * Math.cos(theta);
  return { x_accel, y_accel };
}

export function getVelocityComponents(v, theta) {
  const tangent = 2 * Math.PI + (theta - 4.71238898038);
  const y_velocity = -1 * v * Math.sin(theta);
  const x_velocity = 1 * v * Math.cos(theta);
  return { x_velocity, y_velocity };
}
