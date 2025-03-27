/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.127
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  EllipseOutlineGeometry_default
} from "./chunk-ZVDLC3T4.js";
import "./chunk-WPXU45PH.js";
import "./chunk-L5SO4Y5V.js";
import "./chunk-VMVPONIV.js";
import "./chunk-XED3RXKO.js";
import "./chunk-K5G2WELR.js";
import "./chunk-SLIA3GQP.js";
import "./chunk-XDHM4G3P.js";
import "./chunk-DYJHEP3B.js";
import {
  Cartesian3_default,
  Ellipsoid_default
} from "./chunk-TU6ZXHVU.js";
import "./chunk-EZNAJPP5.js";
import "./chunk-5S2B46UQ.js";
import "./chunk-GK4QU6QI.js";
import "./chunk-QZKN2RXM.js";
import "./chunk-2AVIUB5H.js";
import {
  defined_default
} from "./chunk-7ITUZTFH.js";

// packages/engine/Source/Workers/createEllipseOutlineGeometry.js
function createEllipseOutlineGeometry(ellipseGeometry, offset) {
  if (defined_default(offset)) {
    ellipseGeometry = EllipseOutlineGeometry_default.unpack(ellipseGeometry, offset);
  }
  ellipseGeometry._center = Cartesian3_default.clone(ellipseGeometry._center);
  ellipseGeometry._ellipsoid = Ellipsoid_default.clone(ellipseGeometry._ellipsoid);
  return EllipseOutlineGeometry_default.createGeometry(ellipseGeometry);
}
var createEllipseOutlineGeometry_default = createEllipseOutlineGeometry;
export {
  createEllipseOutlineGeometry_default as default
};
