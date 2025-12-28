import React from 'react'
import clsx from 'clsx'
function Title({title, className}) {
  return (
    <h2 className={clsx("text-2xl font-semibold capitalize")}>
{title}
    </h2>
  )
}

export default Title
