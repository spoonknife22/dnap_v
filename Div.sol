pragma solidity ^0.5.17;


library Div {
    
function mulDiv (uint x, uint y, uint z)
public pure returns (uint)
{
  (uint l, uint h) = fullMul (x, y);
  return fullDiv (l, h, z);
}

function fullMul (uint x, uint y)
public pure returns (uint l, uint h)
{
  uint xl = uint128 (x); uint xh = x >> 128;
  uint yl = uint128 (y); uint yh = y >> 128;
  uint xlyl = xl * yl; uint xlyh = xl * yh;
  uint xhyl = xh * yl; uint xhyh = xh * yh;

  uint ll = uint128 (xlyl);
  uint lh = (xlyl >> 128) + uint128 (xlyh) + uint128 (xhyl);
  uint hl = uint128 (xhyh) + (xlyh >> 128) + (xhyl >> 128);
  uint hh = (xhyh >> 128);
  l = ll + (lh << 128);
  h = (lh >> 128) + hl + (hh << 128);
}
 
function fullDiv (uint l, uint h, uint z)
public pure returns (uint r) {
  require (h < z);
  uint zShift = mostSignificantBit (z);
  uint shiftedZ = z;
  if (zShift <= 127) zShift = 0;
  else
  {
    zShift -= 127;
    shiftedZ = (shiftedZ - 1 >> zShift) + 1;
  }
  while (h > 0)
  {
    uint lShift = mostSignificantBit (h) + 1;
    uint hShift = 256 - lShift;
    uint e = ((h << hShift) + (l >> lShift)) / shiftedZ;
    if (lShift > zShift) e <<= (lShift - zShift);
    else e >>= (zShift - lShift);
    r += e;
    (uint tl, uint th) = fullMul (e, z);
    h -= th;
    if (tl > l) h -= 1;
    l -= tl;
  }
  r += l / z;
}

function mostSignificantBit (uint x) public pure returns (uint r) {
  require (x > 0);
  if (x >= 2**128) { x >>= 128; r += 128; }
  if (x >= 2**64) { x >>= 64; r += 64; }
  if (x >= 2**32) { x >>= 32; r += 32; }
  if (x >= 2**16) { x >>= 16; r += 16; }
  if (x >= 2**8) { x >>= 8; r += 8; }
  if (x >= 2**4) { x >>= 4; r += 4; }
  if (x >= 2**2) { x >>= 2; r += 2; }
  if (x >= 2**1) { x >>= 1; r += 1; }
}


}