/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"
import { Link } from "gatsby"
import PropTypes from "prop-types"
const getUuid = require('uuid-by-string')

import { Row, Col, Image, Tag } from "antd"

import "./item.css"

function Item({ news }) {
  const { title,
        status,
        src,
        source,
        menu,
        local_src,
        load_img,
        img_url,
        href,
        description,
        create_time,
        country,
  } = news
  dayjs.extend(relativeTime)
  const ctime = dayjs().to(dayjs(create_time))
  let backImgUrl = `https://oss.edms.site/news/${load_img}`
  let imagesUrl = img_url
  if (local_src) {
    backImgUrl = `https://oss.edms.site/news/${local_src}`
    imagesUrl = src
  }

  return (
    <div className="item" key={load_img}>
      <Row gutter={[8]} justify="start">
        <Col span={8}>
          <Image
            preview={false}
            className="image-size"
            src={imagesUrl}
            fallback={backImgUrl}
           />
        </Col>
        <Col span={16}>
          <Link to={`/posts/${getUuid(title)}/`}>
             <div className="title">{title}</div>
          </Link>
        </Col>
        <Col span={24}>
          <div className="desc">{description}</div>
        </Col>
      </Row>
      <Row gutter={[8]} justify="start" align="middle">
        <Col span={8}>
          <Tag>{menu}</Tag>
        </Col>
        <Col span={8}>
          <div className="ctime">{ctime}</div>
        </Col>
        <Col span={8}>
          <div className="source">
            src:{" "}
            <a href={href} target="blank">
              {source.toUpperCase()}
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Item.defaultProps = {
  news: {},
}

Item.propTypes = {
  news: PropTypes.object,
}

export default Item
