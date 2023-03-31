import styled from 'styled-components'

export const ImageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: minmax(50px, auto);
  margin-top: 10px;
`

export const ImageItem = styled.div`
  &:nth-child(5n) {
    grid-column-end: span 2;
  }
`

export const Image = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`

export const By = styled.span`
  display: block !important;
  margin: 0 !important;
  margin-top: -27px !important;
  background-color: black;
  opacity: 0.8;
  color: #fff;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content !important;
  padding: 5px;
  font-size: 80%;
  border-radius: 2px;

  &:hover a {
    opacity: 0.8;
  }

  a {
    text-decoration: none;
    color: #fff;
    text-overflow: ellipsis !important;
    font-style: italic;

    strong {
      color: #fff;
      font-style: normal;
    }
  }
`
